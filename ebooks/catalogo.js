
/* ==========================================
   CATÁLOGO DE E-BOOKS
========================================== */

// Lista de e-books disponíveis no catálogo
const livros = [
    {
        id: 'python-na-pratica',
        titulo: 'Python na Prática',
        subtitulo: 'Do Zero à Automação e aos Projetos Reais',
        categoria: 'Programação',
        preco: 19.90,
        status: 'em-producao',
        descricao: 'Aprenda Python do básico ao intermediário com exercícios, automações e projetos reais.'
    }
];


/* ==========================================
   FORMATAÇÃO DE PREÇOS
========================================== */

// Converte valores numéricos para Real brasileiro
const money = (n) => {
    return n.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};


/* ==========================================
   CAPA DOS E-BOOKS
========================================== */

// Gera a capa provisória do e-book
const cover = () => {
    return `
        <div
            class="cover"
            aria-label="Capa provisória de Python na Prática"
        >
            <small>
                GUIA PRÁTICO • PROGRAMAÇÃO
            </small>

            <strong>
                PYTHON<br>
                NA PRÁTICA
            </strong>

            <em>
                Do zero à automação<br>
                e aos projetos reais
            </em>
        </div>
    `;
};


/* ==========================================
   RENDERIZAÇÃO DO CATÁLOGO
========================================== */

function render() {

    // Obtém o texto digitado na pesquisa
    const q = document
        .querySelector('#busca')
        .value
        .trim()
        .toLocaleLowerCase('pt-BR');

    // Obtém a categoria selecionada
    const categoria = document
        .querySelector('.chip.active')
        .dataset.filter;

    // Filtra os e-books pela categoria e pesquisa
    const lista = livros.filter((l) => {

        const categoriaValida =
            categoria === 'Todos' ||
            l.categoria === categoria;

        const texto = `
            ${l.titulo}
            ${l.subtitulo}
            ${l.descricao}
        `.toLocaleLowerCase('pt-BR');

        const pesquisaValida = texto.includes(q);

        return categoriaValida && pesquisaValida;
    });

    // Gera os cards dos e-books
    document.querySelector('#catalogo').innerHTML = lista
        .map((l) => {

            return `
                <article class="product">

                    <!-- CAPA -->
                    ${cover()}

                    <!-- STATUS -->
                    <span class="tag">
                        Em desenvolvimento
                    </span>

                    <!-- TÍTULO -->
                    <h2>
                        ${l.titulo}
                    </h2>

                    <!-- SUBTÍTULO -->
                    <p>
                        ${l.subtitulo}
                    </p>

                    <!-- PREÇO -->
                    <div class="price">
                        ${money(l.preco)}
                    </div>

                    <!-- BOTÃO DE DETALHES -->
                    <a
                        class="btn"
                        href="produto.html?id=${encodeURIComponent(l.id)}"
                    >
                        Ver detalhes →
                    </a>

                </article>
            `;
        })
        .join('');

    // Exibe mensagem caso não existam resultados
    document.querySelector('#vazio').hidden = lista.length !== 0;
}


/* ==========================================
   EVENTOS DA PESQUISA
========================================== */

// Atualiza o catálogo conforme o usuário digita
document
    .querySelector('#busca')
    .addEventListener('input', render);


/* ==========================================
   EVENTOS DOS FILTROS
========================================== */

// Configura os botões de categorias
document.querySelectorAll('.chip').forEach((b) => {

    b.addEventListener('click', () => {

        // Remove a seleção anterior
        document.querySelectorAll('.chip').forEach((x) => {
            x.classList.remove('active');
        });

        // Ativa o filtro selecionado
        b.classList.add('active');

        // Atualiza os produtos exibidos
        render();
    });

});


/* ==========================================
   INICIALIZAÇÃO
========================================== */

// Carrega o catálogo ao abrir a página
render();
