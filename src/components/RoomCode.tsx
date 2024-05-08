import "../styles/room-code.scss"
import copyImg from "../assets/images/copy.svg"

type RoomCodeProps= {
    code: string | undefined;
}

export function RoomCode (props : RoomCodeProps) {
    function copyRoomCodeClipboard() {
        navigator.clipboard.writeText(props.code as string)
    }

    return (
       <button className="room-code" onClick={copyRoomCodeClipboard}>
        <div>
            <img src={copyImg} alt="Copy room code"/>
        </div>
        <span>Sala #{props.code}</span>
       </button> 
    )
}