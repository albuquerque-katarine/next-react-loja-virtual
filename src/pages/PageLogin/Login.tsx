import { useState } from "react";
import { useRouter } from 'next/navigation';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function Login() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    let logado = false;

    const router = useRouter();

    function logar(nome: string, email: string, senha: string):void {
        if (nome != "" && email != "" && senha != "") {
            logado = true;
            router.push(`/PageProdutos/Produtos?nome=${nome}&logado=${logado}`);
        }
        else {
            logado = false;
            setMensagem("Informe os dados para realizar o login!");
        }
    }
    
    return (
        <div className="page">
            <Header imagem="./assets/loja_virtual_logo_topo.svg" bgImagem='./assets/loja_virtual_banner.svg'/>
            <main className="main">                
                <section className="section_login flex flex-col">
                    <h2>Login</h2>
                    <br />
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" value={nome} onChange={evt=> setNome(evt.target.value)} autoComplete="off"/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={evt=> setEmail(evt.target.value)} autoComplete="off"/>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="denha" value={senha} onChange={evt=> setSenha(evt.target.value)} autoComplete="off"/>
                    <div className="div_login flex gap-15">
                        <button type="button" onClick={() => logar(nome, email, senha)}>Enviar</button>
                    </div>
                    <br />
                    <label>{mensagem !="" ? mensagem: ""}</label>
                </section>
            </main>
            <Footer imagem="./assets/loja_virtual_logo_footer.svg"/>
        </div>
    )
}