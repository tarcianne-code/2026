// ================= LOGIN =================

function getUsuarios(){
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function salvarUsuarios(lista){
    localStorage.setItem("usuarios", JSON.stringify(lista));
}

function cadastrar(){
    let user = cadUser.value.trim();
    let pass = cadPass.value.trim();
    if(!user || !pass) return alert("Preencha tudo");

    let usuarios = getUsuarios();
    if(usuarios.find(u => u.user === user))
        return alert("Usuário já existe");

    usuarios.push({user, pass, dados:{}});
    salvarUsuarios(usuarios);
    localStorage.setItem("usuarioLogado", user);
    window.location.href = "dashboard.html";
}

function login(){
    let user = loginUser.value.trim();
    let pass = loginPass.value.trim();
    let usuarios = getUsuarios();
    let encontrado = usuarios.find(u => u.user === user && u.pass === pass);

    if(!encontrado) return alert("Dados incorretos");

    localStorage.setItem("usuarioLogado", user);
    window.location.href = "dashboard.html";
}

function logout(){
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}

function mostrarLogin(){
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

function mostrarCadastro(){
    document.getElementById("login").classList.add("hidden");
    document.getElementById("cadastro").classList.remove("hidden");
}

// ================= DASHBOARD =================

let usuario = localStorage.getItem("usuarioLogado");
if(!usuario && window.location.pathname.includes("dashboard"))
    window.location.href="index.html";

let anoAtual = null;
let mesAtual = null;

function criarAno(){
    let ano = prompt("Digite o ano:");
    if(!ano) return;

    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    if(user.dados[ano])
        return alert("Ano já existe");

    user.dados[ano] = {};
    salvarUsuarios(usuarios);
    carregarAnos();
}

function carregarAnos(){
    let lista = document.getElementById("listaAnos");
    if(!lista) return;

    lista.innerHTML="";
    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    Object.keys(user.dados).forEach(ano=>{
        lista.innerHTML += `
            <div style="margin-bottom:10px;">
                <strong onclick="selecionarAno('${ano}')">${ano}</strong>
                <button onclick="criarMes('${ano}')">+ Mês</button>
                <div id="meses-${ano}" style="margin-left:15px;"></div>
            </div>
        `;
        carregarMeses(ano);
    });
}

function criarMes(ano){
    let mes = prompt("Nome do mês:");
    if(!mes) return;

    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    if(user.dados[ano][mes])
        return alert("Mês já existe");

    user.dados[ano][mes] = { movs: [] };
    salvarUsuarios(usuarios);
    carregarAnos();
}

function carregarMeses(ano){
    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    let container = document.getElementById("meses-"+ano);
    container.innerHTML="";

    Object.keys(user.dados[ano]).forEach(mes=>{
        container.innerHTML += `
            <div onclick="selecionarMes('${ano}','${mes}')">
                📁 ${mes}
            </div>
        `;
    });
}

function selecionarAno(ano){
    anoAtual = ano;
    tituloAtual.innerText = "Ano: " + ano;
}

function selecionarMes(ano,mes){
    anoAtual = ano;
    mesAtual = mes;
    tituloAtual.innerText = "Ano: " + ano + " / Mês: " + mes;
    atualizarTela();
}

function adicionarMov(){
    if(!anoAtual || !mesAtual)
        return alert("Selecione ano e mês");

    let data = document.getElementById("data").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = parseFloat(document.getElementById("valor").value);

    if(!data || !descricao || isNaN(valor))
        return alert("Preencha tudo");

    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    user.dados[anoAtual][mesAtual].movs.push({data,tipo,descricao,valor});
    salvarUsuarios(usuarios);
    atualizarTela();
}

function atualizarTela(){
    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    if(!anoAtual || !mesAtual) return;

    let movs = user.dados[anoAtual][mesAtual].movs || [];

    tabela.innerHTML="";
    let entrada=0,saida=0;

    movs.forEach((m,i)=>{
        if(m.tipo==="Entrada") entrada+=m.valor;
        else saida+=m.valor;

        tabela.innerHTML+=`
        <tr>
        <td>${m.data}</td>
        <td class="${m.tipo==='Entrada'?'entrada':'saida'}">${m.tipo}</td>
        <td>${m.descricao}</td>
        <td>${m.valor.toFixed(2)}</td>
        <td><button onclick="remover(${i})">Excluir</button></td>
        </tr>`;
    });

    resumo.innerHTML=`
    Entradas: R$ ${entrada.toFixed(2)} |
    Saídas: R$ ${saida.toFixed(2)} |
    <strong>Saldo: R$ ${(entrada-saida).toFixed(2)}</strong>
    `;
}

function remover(index){
    let usuarios = getUsuarios();
    let user = usuarios.find(u=>u.user===usuario);

    user.dados[anoAtual][mesAtual].movs.splice(index,1);
    salvarUsuarios(usuarios);
    atualizarTela();
}

carregarAnos();