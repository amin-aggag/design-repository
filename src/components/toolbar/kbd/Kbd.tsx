import "./kbd.css"

export function Kbd({ keyName }: { keyName: string }) {
    return (
        <div className="kbd">
            <span>{keyName}</span>
        </div>
    )
}