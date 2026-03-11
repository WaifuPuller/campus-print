import "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"

export async function analyzePDF(file){

const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise

let colorPages = 0
let bwPages = 0

for(let i=1;i<=pdf.numPages;i++){

const page = await pdf.getPage(i)

const viewport = page.getViewport({scale:1})

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

canvas.width = viewport.width
canvas.height = viewport.height

await page.render({
canvasContext:ctx,
viewport:viewport
}).promise

const data = ctx.getImageData(0,0,canvas.width,canvas.height).data

let isColor = false

for(let j=0;j<data.length;j+=4){

const r=data[j]
const g=data[j+1]
const b=data[j+2]

if(!(r===g && g===b)){
isColor=true
break
}

}

if(isColor) colorPages++
else bwPages++

}

return {
pages:pdf.numPages,
colorPages,
bwPages
}

}