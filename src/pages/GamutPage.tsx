import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

type Point = { x: number; y: number }

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function barycentric(p: Point, a: Point, b: Point, c: Point) {
  const v0 = { x: b.x - a.x, y: b.y - a.y }
  const v1 = { x: c.x - a.x, y: c.y - a.y }
  const v2 = { x: p.x - a.x, y: p.y - a.y }
  const d00 = v0.x * v0.x + v0.y * v0.y
  const d01 = v0.x * v1.x + v0.y * v1.y
  const d11 = v1.x * v1.x + v1.y * v1.y
  const d20 = v2.x * v0.x + v2.y * v0.y
  const d21 = v2.x * v1.x + v2.y * v1.y
  const denom = d00 * d11 - d01 * d01
  const v = (d11 * d20 - d01 * d21) / denom
  const w = (d00 * d21 - d01 * d20) / denom
  const u = 1 - v - w
  return { u, v, w }
}

function insideTriangle(bc: { u: number; v: number; w: number }) {
  const { u, v, w } = bc
  return u >= 0 && v >= 0 && w >= 0 && u <= 1 && v <= 1 && w <= 1
}

export default function GamutPage() {
  const nav = useNavigate()
  const { recordAnswer, answers } = useQuiz()
  const [selected, setSelected] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Canvas and triangle geometry
  const width = 320
  const height = 280
  const padding = 12
  const A: Point = { x: width / 2, y: padding } // top vertex
  const B: Point = { x: padding, y: height - padding } // bottom-left
  const C: Point = { x: width - padding, y: height - padding } // bottom-right

  // RGB primaries at the corners (R, G, B)
  const R = [255, 0, 0]
  const G = [0, 255, 0]
  const Bc = [0, 0, 255]

  // Render the triangle gamut once
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = width
    canvas.height = height

    const img = ctx.createImageData(width, height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const bc = barycentric({ x, y }, A, B, C)
        const inside = insideTriangle(bc)
        const idx = (y * width + x) * 4
        if (!inside) {
          // transparent outside
          img.data[idx + 3] = 0
          continue
        }
        const r = bc.u * R[0] + bc.v * G[0] + bc.w * Bc[0]
        const g = bc.u * R[1] + bc.v * G[1] + bc.w * Bc[1]
        const b = bc.u * R[2] + bc.v * G[2] + bc.w * Bc[2]
        img.data[idx + 0] = Math.max(0, Math.min(255, Math.round(r)))
        img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)))
        img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)))
        img.data[idx + 3] = 255
      }
    }
    ctx.putImageData(img, 0, 0)

    // Draw triangle border
    ctx.strokeStyle = '#808080'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(A.x, A.y)
    ctx.lineTo(B.x, B.y)
    ctx.lineTo(C.x, C.y)
    ctx.closePath()
    ctx.stroke()
  }, [])

  // Pick a random target within the triangle using random barycentric coords
  const [target] = useState(() => {
    let u = Math.random(), v = Math.random()
    if (u + v > 1) { u = 1 - u; v = 1 - v }
    const w = 1 - u - v
    const r = u * R[0] + v * G[0] + w * Bc[0]
    const g = u * R[1] + v * G[1] + w * Bc[1]
    const b = u * R[2] + v * G[2] + w * Bc[2]
    return rgbToHex(r, g, b)
  })

  const progress = 0

  // Warn on refresh if any answers exist
  useEffect(() => {
    const hasProgress = Object.keys(answers).length > 0
    if (!hasProgress) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [answers])

  const updateFromXY = (el: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = el.getBoundingClientRect()
    const x = Math.floor(clientX - rect.left)
    const y = Math.floor(clientY - rect.top)
    const bc = barycentric({ x, y }, A, B, C)
    if (!insideTriangle(bc)) return
    const r = bc.u * R[0] + bc.v * G[0] + bc.w * Bc[0]
    const g = bc.u * R[1] + bc.v * G[1] + bc.w * Bc[1]
    const b = bc.u * R[2] + bc.v * G[2] + bc.w * Bc[2]
    const hex = rgbToHex(r, g, b)
    setSelected(hex)
  }

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const el = e.currentTarget
    updateFromXY(el, e.clientX, e.clientY)
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const t = e.changedTouches[0]
    if (!t) return
    const el = e.currentTarget
    updateFromXY(el, t.clientX, t.clientY)
  }

  const onFinish = () => {
  if (!selected) return
  recordAnswer(200, selected)
    recordAnswer(201, target)
    nav('/results')
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5} sx={{ color: 'text.secondary' }}>
  <Typography variant="body2">Round 3: additive RGB triangle — pick the color that matches the given shade</Typography>
      </Stack>
      <Box role="separator" aria-hidden sx={{ width: '100%', borderTop: '1px solid #ffffff', borderBottom: '1px solid #7f7f7f' }} />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6">Color match</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 64, height: 64, border: '1px solid #808080', backgroundColor: target }} />
                <Typography variant="caption" color="text.secondary">Target</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ width: 64, height: 64, border: '1px solid #808080', backgroundColor: selected || 'transparent' }} />
                <Typography variant="caption" color="text.secondary">Selected</Typography>
              </Stack>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <canvas
                ref={canvasRef}
                width={width}
                height={height}
                onClick={onClick}
                onTouchEnd={onTouchEnd}
                aria-label="triangle color picker"
                style={{ border: '1px solid #808080' }}
              />
            </Box>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={onFinish} disabled={!selected}>Finish</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}
