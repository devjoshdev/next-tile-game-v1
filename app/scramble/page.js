import TileBoard from "@/components/TileBoard";
export default async function Scramble() {
    return (
        <div>
            <h1 style={{textAlign: "center",}}>The Tile Game</h1>
            <hr/>
            <TileBoard scramble={true}/>
        </div>
    )
}