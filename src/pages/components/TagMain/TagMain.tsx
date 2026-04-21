interface TagMainProps {
    titulo?: string;
    children: any;
}

export default function TagMain(props:TagMainProps) {
    return (
        <main className="main">
            <h2 className="main_titulo">{props.titulo}</h2>
            { props.children }
        </main>
    )
}