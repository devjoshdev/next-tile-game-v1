import TileBoard from "@/components/TileBoard"
export default async function Home() {
  return (
    <div>
      <h1 style={{textAlign: "center",}}>The Tile Game</h1>
      <hr/>
      <TileBoard scramble={false}/>
    </div>
  )
}
