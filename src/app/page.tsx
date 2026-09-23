import { Notebook } from '@/components/sections/Notebook'
import { Values } from '@/components/sections/Values'
import { CuttingMat } from '@/components/sections/CuttingMat'
import { Connect } from '@/components/sections/Connect'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Notebook />
      <Values />
      <CuttingMat />
      <Connect />
      <Contact />
    </main>
  )
}
