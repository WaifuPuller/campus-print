import { analyzePDF } from "./pdf.js"

export async function calculateCost(file){

const type = localStorage.getItem("printType")
const copies = parseInt(localStorage.getItem("copies"))

const result = await analyzePDF(file)

let cost = 0

if(type === "ad"){

const first = Math.min(result.pages,5)

cost += first * 10

let remaining = result.pages - 5

if(remaining > 0){

const bw = Math.min(result.bwPages,remaining)

cost += bw * 3

const color = Math.min(result.colorPages,remaining)

cost += color * 10

}

}

else if(type === "normal_bw"){

cost = result.pages * 3

}

else if(type === "normal_color"){

cost = (result.bwPages*3)+(result.colorPages*10)

}

let total = cost * copies

total = Math.ceil(total/10)*10

return {
...result,
copies,
totalCost:total
}

}