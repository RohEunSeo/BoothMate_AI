// src/utils/parseCompanyCSV.ts
export interface Company {
  id: string
  name: string
  field: string
  boothCount: number
}

export async function parseCSV(file: File): Promise<Company[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const csv = event.target?.result as string
      const lines = csv.trim().split("\n")
      const result: Company[] = []

      for (let i = 1; i < lines.length; i++) {
        const [name, field, boothCount] = lines[i].split(",")
        result.push({
          id: `C${i}`,
          name: name.trim(),
          field: field.trim(),
          boothCount: parseInt(boothCount.trim())
        })
      }

      resolve(result)
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}
