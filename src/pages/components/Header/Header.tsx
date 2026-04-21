import Link from "next/link";

interface HeaderProps {
    imagem: string;
    bgImagem: string;
    logado?: boolean;
    usuario?: string;
    qtdProdutos?: number;
}

export default function Header(props: HeaderProps) {
    return (
        <header className="header flex justify-between items-center gap-10" style={{backgroundImage: `url(${props.bgImagem})`}}>
            <Link href={props.logado ? `/PageProdutos/Produtos?nome=${props.usuario}&logado=${props.logado}`: '/'}><img src={props.imagem} alt="Banner" /></Link>
            <div className="header_menu flex gap-20 md:gap-2 items-end">
                { props.logado ? "" : (<Link href="/PageLogin/Login">Login</Link>) }                
                <p className="header_cart_p">Carrinho: {props.qtdProdutos}</p>
                {props.logado ? (<p className="header_p_usuario" style={{border: `${props.logado ? '3px solid #fff' : 0}` , borderRadius: `${props.logado ? '50%' : 0}`}}>{props.usuario}</p>) : ""}
            </div>
        </header>
    )
}