interface FooterProps {
    imagem: string;
}

export default function Footer(props: FooterProps) {
    return (
        <footer className="footer">
            <img src={props.imagem} alt="Logo Footer kbadigital" />
        </footer>
    )
}