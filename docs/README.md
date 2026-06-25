# Introdução

Informações básicas do projeto.

* **Projeto:** Valkyria
* **Repositório GitHub:** [Repository](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2026-1-ti1-0427200-nyx)
* **Membros da equipe:**

  * [Alexandre de Souza Freitas Martins](https://github.com/Xande-01) 
  * [André Mozzer Ramos](https://github.com/Pwgmy) 
  * [Carolina Almeida Mendes de Souza](https://github.com/Carolinasouza456) 
  * [Giovanni Arenare Mota](https://github.com/GiovanniArenare) 
  * [Gustavo Alberto Araújo de Sá](https://github.com/Gustagusgu) 
  * [Miguel de Freitas Abood](https://github.com/MiguelFAbood)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

[Documentação de Design Thinking (MIRO)](files/Nyx.pdf)

# Contexto

1. Espaço do Problema

O problema central é a hostilidade sistêmica. O ambiente de jogos online, especialmente os competitivos, tornou-se um campo minado para mulheres. A "dor" se manifesta em:

Silenciamento forçado: Jogadoras evitam usar o chat de voz para não serem alvo de insultos.

Exclusão e Assédio: A misoginia afasta talentos e diminui o prazer do hobby.

Falta de Filtros Eficazes: As ferramentas atuais das grandes publishers são reativas (banem depois do dano feito), e não preventivas.

2. Objetivos do Projeto

O objetivo principal é a criação de um "Safe Haven" (Porto Seguro) digital. De forma mais específica:

Conexão Segura: Facilitar o encontro de jogadoras para que ninguém precise jogar em lobbies públicos tóxicos sozinha.

Moderação Active: Implementar um sistema de verificação de identidade para garantir que o ambiente permaneça exclusivamente feminino e seguro.

Funcionalidade Prática: Oferecer ferramentas como o "Buscador de Squads", otimizando o matchmaking com base em afinidade e respeito, não apenas em ranking de habilidade.

3. Justificativa

A justificativa reside no fato de que segurança é o pré-requisito para a participação.

Muitas mulheres possuem o hardware e o interesse (como vemos na sua experiência com bancos de dados e desenvolvimento), mas recuam devido ao custo emocional da interação social nos jogos.

Existe uma demanda reprimida por um espaço onde o foco seja a gameplay e o social, sem a necessidade de "provar seu valor" constantemente ou tolerar abusos. O Valkyria justifica-se como uma ferramenta de saúde mental e inclusão digital.

4. Público-Alvo

O foco são mulheres gamers de todos os perfis:

Casuais: Que buscam apenas um ambiente relaxante para jogar após o dia de trabalho/estudo.

Competitivas/Hardcore: Que levam a sério a performance (seja em FPS, MOBAs ou jogos de luta) e precisam de comunicação clara e estratégica (voz) sem medo de retaliação.

Criadoras e Entusiastas: Que buscam networking e uma comunidade que compartilhe os mesmos desafios no mundo tech e gamer.

# Product Discovery

### Matriz CSD (Certezas, Suposições e Dúvidas)

| Certezas | Suposições | Dúvidas |
| :--- | :--- | :--- |
| O ambiente online é hostil para mulheres. | Usuárias aceitam verificação de identidade por segurança. | Qual o método de verificação menos invasivo? |
| A comunicação por voz é o maior gatilho de abusos. | Um ambiente exclusivo aumentará o tempo de jogo das usuárias. | Como escalar a moderação sem perder a agilidade? |
| Existe demanda por espaços seguros de matchmaking. | Parcerias com desenvolvedoras facilitarão o acesso. | Qual a melhor forma de monetização ética? |

### Mapa de Stakeholders
* **Primários:** Jogadoras casuais, jogadoras competitivas (eSports) e streamers.
* **Secundários:** Desenvolvedoras de jogos, organizations de torneios femininos e marcas de hardware.
* **Internos:** Equipe de desenvolvimento, moderadoras de comunidade e Product Owner.

### Pesquisa e Entendimento do Problema
Cerca de **75% das mulheres** já sofreram assédio em jogos online. O problema central é a exclusão sistêmica: para evitar conflitos, jogadoras escondem sua identidade ou evitam gêneros competitivos. A Valkyria atua na causa raiz, criando uma infraestrutura onde o gênero não é um fator de risco.

### Personas
1.  **Aline (24 anos - Hardcore):** Jogadora competitiva de FPS. Domina as mecânicas, mas joga no mudo. Busca um squad fixo para subir de ranking com seriedade e respeito.
2.  **Beatriz (19 anos - Casual):** Estudante e fã de RPGs. Quer fazer amizades e compartilhar suas conquistas sem ser julgada ou receber comentários condescendentes.

---

## 2. Product Design

### Histórias de Usuários
* **Segurança:** Como usuária, quero passar por uma verificação de identidade para garantir que estou em um ambiente 100% feminino.
* **Conexão:** Como jogadora de Fighting Games, quero filtrar parceiras por jogo (ex: Street Fighter) para treinar em um ambiente amigável.
* **Comunidade:** Como criadora, quero postar clips das minhas jogadas para receber apoio e feedback da comunidade.

### Proposta de Valor
* **Produtos e Serviços:** Rede social com matchmaking de squads e feed de comunidade moderado.
* **Aliviadores de Dor:** Filtro de toxicidade, verificação de identidade e sistema de denúncia ágil.
* **Criadores de Ganho:** Facilidade em encontrar times, ambiente de networking seguro e valorização do talento feminino.

---

## 3. Projeto de Interface

### Fluxo do Usuário
[Fluxo de usuário 1](images/flux1.jpeg)
[Fluxo de usuário 2](images/flux2.jpeg)
[Fluxo de usuário 3](images/flux3.jpeg)
[Fluxo de usuário 4](images/flux4.jpeg)

### Wireframes e Protótipos
* **Wireframes e Protótipo Interativo:** [TIAW](images/Kanban.pdf)

---

## 4. Metodologia e Ferramentas

### Ferramentas Empregadas
* **Editor de Código:** VS Code (Desenvolvimento em Python e JavaScript).
* **Comunicação:** Discord (Daily meetings e alinhamento).
* **Diagramação/Design:** Excalidraw (UI/UX e Protótipo).
* **Gestão de Tarefas:** GitHub Projects e Miro (Kanban).
* **Hospedagem:** N/A

### Organização da Equipe (Scrum)
Utilizamos o framework **Scrum** com ciclos de entrega (Sprints) de 2 semanas.
* **Product Owner:** Responsável pelo Backlog e visão do produto.
* **Scrum Master:** Facilitador de processos e remoção de impedimentos.
* **Dev Team:** Responsável pela implementação técnica e arquitetura.

### Quadro Kanban (Status do Projeto)
![Kanban](https://miro.com/app/board/uXjVGvS4FkI=/?share_link_id=13458464024)

* **To Do:** Projeto inicial em HTML e CSS.
* **Doing:** Identidade Visual.
* **Done:** Protótipos, user flow.

---

# 5. Solução Implementada

## Funcionalidades

Abaixo estão detalhadas as telas que integram a aplicação web Valkyria, mapeando seu comportamento lógico e orientações práticas de uso:

#### 1. Autenticação e Entrada (Login e Sobre Você)
* **Descrição:** Telas responsáveis pelo controle de acesso. O *Login* valida as credenciais e define qual conta iniciará a sessão (mapeada no endpoint `/current_user_id`). A página *Sobre Você* funciona como um onboarding personalizado, coletando as preferências iniciais da usuária logo após o seu registro.
* **Instruções de Uso:** A usuária insere seus dados de acesso em `login.html`. Após a validação, a sessão é ativada no sistema e o fluxo redireciona para a dashboard principal.

#### 2. Painel de Controle e Ajustes (Home, Configurações e Menu Lateral)
* **Descrição:** A *Home* centraliza o feed principal da plataforma e o status do ecossistema. O menu global expansível fornece caminhos para todas as rotas internas, incluindo a tela de *Configurações* operacionais do sistema.
* **Instruções de Uso:** Através da dashboard inicial, a usuária clica nos componentes visuais ou utiliza a barra lateral para navegar pelas áreas de interação.

#### 3. Identidade e Customização (Perfil e Edição de Perfil)
* **Descrição:** Renderiza dinamicamente as informações de cadastro, biografia, imagens de avatar/banner e tags de jogos favoritos. Possui proteção condicional client-side: se o identificador em visualização for o mesmo logado (`u0`), as opções para abrir a tela de *Edição de Perfil* ficam visíveis. Se for um acesso a terceiros via URL (ex: `?id=u1`), a aplicação oculta os botões em modo de leitura protegida.
* **Instruções de Uso:** Acesse `perfil_usuario.html` para gerenciar seus dados. Para modificar suas mídias (convertidas via JavaScript em strings Base64), clique em salvar para atualizar seu perfil.

#### 4. Comunicação Direta (Chat, Amigos e Adicionar Amigos)
* **Descrição:** Canal privado projetado para matchmaking e networking seguro entre as jogadoras. A interface do *Chat* manipula históricos cronológicos estruturados de forma privada. As páginas de *Amigos* e *Adicionar Amigos* gerenciam as conexões sociais da conta.
* **Instruções de Uso:** Abra a aba de chat, escolha uma participante ativa na lista de conversas e envie mensagens de texto. O sistema carregará o histórico daquela conversa (ex: `conv_101`) e gravará os novos envios em tempo real.

#### 5. Ambientes Comunitários (Busca de Comunidade, Perfil da Comunidade, Fórum e Posts)
* **Descrição:** Módulos voltados para o engajamento social em grupo. Fornecem a *Busca de Comunidades* por títulos de jogos específicos. Ao entrar, o *Perfil da Comunidade* apresenta o *Fórum* de discussões e a árvore de *Posts* estruturados para trocas de experiências.
* **Instruções de Uso:** Pesquise pelo seu jogo favorito, entre no fórum dedicado e participe ativamente lendo os relatos das outras jogadoras ou criando um novo post explicativo.

#### 6. Canal de Moderação (Denúncia)
* **Descrição:** Funcionalidade central de governança focada em garantir um ambiente seguro e exclusivo para mulheres. Coleta dados de comportamento ofensivo em chats ou posts e encaminha relatórios para análise da moderação.
* **Instruções de Uso:** Diante de qualquer violação de regras comunitárias, a usuária acessa o formulário de denúncia, anexa as informações solicitadas e envia os dados para processamento ágil.

---

## Estruturas de Dados

Abaixo está representado o esquema unificado de dados reais integrados no arquivo de configuração e persistência local da aplicação (`db.json`):

```json
{
  "current_user_id": "u0",
  "users": [
    {
      "id": "u0",
      "username": "ShibuyaDesu",
      "avatar": "[https://i.pinimg.com/736x/7a/f8/54/7af854bdcc9d4fec5b0d50d34506e7c1.jpg](https://i.pinimg.com/736x/7a/f8/54/7af854bdcc9d4fec5b0d50d34506e7c1.jpg)",
      "is_online": true,
      "banner": "",
      "bio": "Jogadora de FPS nas horas vagas.",
      "jogos_favoritos": ["Valorant", "CS2", "Guilty_Gear_Strive"]
    },
    {
      "id": "u1",
      "username": "MorganaLover123",
      "avatar": "[https://i.pinimg.com/736x/00/91/d3/0091d3d01515a9eb769f83dbf918afd1.jpg](https://i.pinimg.com/736x/00/91/d3/0091d3d01515a9eb769f83dbf918afd1.jpg)",
      "is_online": true,
      "banner": "",
      "bio": "Suporte mono Morgana.",
      "jogos_favoritos": ["LoL"]
    },
    {
      "id": "u2",
      "username": "Omae🌾🌾🌾",
      "avatar": "[https://media1.tenor.com/m/uGbBwhfRcZ4AAAAd/omae.gif](https://media1.tenor.com/m/uGbBwhfRcZ4AAAAd/omae.gif)",
      "is_online": false,
      "banner": "",
      "bio": "Gosto de jogos de simulação e fazendinha.",
      "jogos_favoritos": ["Rocket_League", "Guilty_Gear_Strive"]
    }
  ],
  "conversations": [
    {
      "conversation_id": "conv_101",
      "participants": ["u0", "u1"],
      "messages": [
        { "sender_id": "u1", "text": "Oi! Você joga LoL?", "timestamp": "20:25" },
        { "sender_id": "u0", "text": "Não :(", "timestamp": "20:28" },
        { "sender_id": "u1", "text": "Ah :(", "timestamp": "20:30" },
        { "sender_id": "u0", "text": "Mas jogo outros jogos, tipo Valorant e Guilty Gear", "timestamp": "20:31" },
        { "sender_id": "u1", "text": "Ah, legal! Eu só jogo LoL mesmo, mas quem sabe a gente não joga algo junto algum dia?", "timestamp": "20:32" },
        { "sender_id": "u0", "text": "Com certeza! Seria ótimo jogar algo com você :)", "timestamp": "20:32" }
      ]
    },
    {
      "conversation_id": "conv_102",
      "participants": ["u0", "u2"],
      "messages": [
        { "sender_id": "u2", "text": "Vamo bater um guilty gear?", "timestamp": "22:45" },
        { "sender_id": "u0", "text": "Calma, tô terminando uma aqui ", "timestamp": "22:46" },
        { "sender_id": "u2", "text": "Blz", "timestamp": "22:47" },
        { "sender_id": "u2", "text": "OMAE🌾🌾🌾", "timestamp": "22:47" },
        { "sender_id": "u0", "text": "OMAE🌾🌾🌾", "timestamp": "22:47" }
      ]
    }
  ]
}