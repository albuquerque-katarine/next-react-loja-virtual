import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import TagMain from "../components/TagMain/TagMain";

interface ProdutoList {
    id?: number;
    nome: string;
    valor: number;
    promocao: number;
}

export default function Produtos() {

    let ProdutosLoja: ProdutoList[] = [
        {
            id: 1,
            nome: "Mouse",
            valor: 24.99,
            promocao: 15.00
        },
        {
            id: 2,
            nome: "Teclado",
            valor: 45.99,
            promocao: 0
        },
        {
            id: 3,
            nome: "Fone de Ouvido",
            valor: 18.99,
            promocao: 3.00
        },
        {
            id: 4,
            nome: "Monitor",
            valor: 456.99,
            promocao: 80.00
        },
        {
            id: 5,
            nome: "Web Cam",
            valor: 59.99,
            promocao: 0
        },
        {
            id: 6,
            nome: "Cabo de Rede",
            valor: 65.99,
            promocao: 30.00
        },
        {
            id: 7,
            nome: "Impressora",
            valor: 165.99,
            promocao: 35.00
        },
        {
            id: 8,
            nome: "Modem",
            valor: 129.99,
            promocao: 0
        },
        {
            id: 9,
            nome: "Mouse Pad",
            valor: 14.99,
            promocao: 0
        },
        {
            id: 10,
            nome: "Caixa de Som",
            valor: 112.99,
            promocao: 55.00
        }
    ]

    const router = useRouter();

    const [dados, setDados] = useState<ProdutoList[]>([]);

    function getLetraNome(nome: any) {
        if(typeof(nome) === 'undefined') {
            return "";
        }
        return (nome[0] + nome[1]).toString();
    }

    function getLogado(logado: any) {
        return Boolean(logado);
    }

    function calcularDesconto(valor: number, promocao: number): number {
        let c = valor - promocao;
        if (isNaN(c)) {
            return 0;
        } else {
            return Math.abs(c);
        }
    }

    function getCompra(id: number, nome: any, valor: number, promocao: number) {
        promocao = 0;
        setDados([...dados, { id, nome, valor, promocao }]);
        console.log(dados);
    }

    function totalProdutos(): string {
        let soma: number = 0;
        dados.forEach((p) => {
            soma += p.valor;
        })
        return soma.toFixed(2);
    }

    function removerProduto(id: number) {
        setDados((prev) => prev.filter((item) => item.id !== id));
    }


    return (
        <div className="page">
            <Header qtdProdutos={dados.length > 0 ? dados.length : 0} usuario={getLetraNome(router.query?.nome)} logado={getLogado(router.query.logado)} imagem="../assets/loja_virtual_logo_topo.svg" bgImagem='../assets/loja_virtual_banner.svg' />
            <TagMain titulo="Produtos">
                <section className="itens_produtos_row flex justify-start">
                    <section className="itens_produtos">
                        {
                            ProdutosLoja.map(p =>
                            (
                                <article className={`item_produto flex flex-col justify-around items-start ${p.promocao > 0 ? "item_produto_promocional" : "item_produto_nao_promocional"}`} key={p.id}>
                                    <h4>{p.nome}</h4>
                                    <div>
                                        <p>Valor: R$ {p.valor}</p>
                                        {
                                            p.promocao > 0 && (<p className="item_produto_promocao">Promoção: R$ {p.promocao.toFixed(2)}</p>)
                                        }
                                        <p className="item_produto_venda">Venda: R$ {calcularDesconto(Number(p.valor), p.promocao).toFixed(2)}</p>
                                        <button type="button" onClick={() => getLogado(router.query.logado) ? getCompra(Number(p.id), (p.nome).toString(), calcularDesconto(p.valor, p.promocao), p.promocao) : router.push('/PageLogin/Login')}>Comprar</button>
                                    </div>
                                </article>
                            ))
                        }
                    </section>
                    <section className="carrinho flex flex-col items-start">
                        <h4>Carrinho</h4>
                        <h5>Quantidade de produtos: {dados.length}</h5>
                        <p className="total_carrinho">Total: R$ {totalProdutos()}</p>
                        <br />
                        <article>
                            {
                                dados.map((p, index) => {
                                    return <section key={index} className="carrinho_dados flex items-center">
                                        <p className="cart_nome_prod">{p.nome} </p>
                                        <p className="cart_separador"> - </p>
                                        <p className="cart_valor_prod">R$ {(p.valor).toFixed(2)}</p>
                                        <button className="remover_carrinho" type="button" onClick={() => removerProduto(Number(p.id))}>x</button>
                                    </section>
                                })
                            }
                        </article>
                    </section>
                </section>
            </TagMain>
            <Footer imagem="../assets/loja_virtual_logo_footer.svg" />
        </div>
    )
}
