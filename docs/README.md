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

Moderação Ativa: Implementar um sistema de verificação de identidade para garantir que o ambiente permaneça exclusivamente feminino e seguro.

Funcionalidade Prática: Oferecer ferramentas como o "Buscador de Squads", otimizando o matchmaking com base em afinidade e respeito, não apenas em ranking de habilidade.

3. Justificativa

A justificativa reside no fato de que segurança é o pré-requisito para a participação.

Muitas mulheres possuem o hardware e o interesse (como vemos na sua experiência com bancos de dados e desenvolvimento), mas recuam devido ao custo emocional da interação social nos jogos.

Existe uma demanda reprimida por um espaço onde o foco seja a gameplay e o social, sem a necessidade de "provar seu valor" constantemente ou tolerar abusos. O Valkyria justifica-se como uma ferramenta de saúde mental e inclusão digital.

4. Público-Alvo

O foco são mulheres gamers de todos os perfis:

Casuais: Que buscam apenas um ambiente relaxante para jogar após o dia de trabalho/estudo.

Competitivas/Hardcore: Que levam a sério a performance (seja em FPS, MOBAs ou jogos de luta) e precisam de comunicação clara e  estratégica (voz) sem medo de retaliação.

Criadoras e Entusiastas: Que buscam networking e uma comunidade que compartilhe os mesmos desafios no mundo tech e gamer.

#Product Discovery

### Matriz CSD (Certezas, Suposições e Dúvidas)

| Certezas | Suposições | Dúvidas |
| :--- | :--- | :--- |
| O ambiente online é hostil para mulheres. | Usuárias aceitam verificação de identidade por segurança. | Qual o método de verificação menos invasivo? |
| A comunicação por voz é o maior gatilho de abusos. | Um ambiente exclusivo aumentará o tempo de jogo das usuárias. | Como escalar a moderação sem perder a agilidade? |
| Existe demanda por espaços seguros de matchmaking. | Parcerias com desenvolvedoras facilitarão o acesso. | Qual a melhor forma de monetização ética? |

### Mapa de Stakeholders
* **Primários:** Jogadoras casuais, jogadoras competitivas (eSports) e streamers.
* **Secundários:** Desenvolvedoras de jogos, organizações de torneios femininos e marcas de hardware.
* **Internos:** Equipe de desenvolvimento, moderadoras de comunidade e Product Owner.

### Pesquisa e Entendimento do Problema
Cerca de **75% das mulheres** já sofreram assédio em jogos online. O problema central é a exclusão sistêmica: para evitar conflitos, jogadoras escondem sua identidade ou evitam gêneros competitivos. A Valkyria atua na causa raiz, criando uma infraestrutura onde o gênero não é um fator de risco.

### Personas
1.  **Aline (24 anos - Hardcore):** Jogadora competitiva de FPS. Domina as mecânicas, mas joga no mudo. Busca um squad fixo para subir de ranking com seriedade e respeito.
2.  **Beatriz (19 anos - Casual):** Estudante e fã de RPGs. Quer fazer amizades e compartilhar suas conquistas sem ser julgada ou receber comentários condescendentes.

---

##  2. Product Design

### Histórias de Usuários
* **Segurança:** Como usuária, quero passar por uma verificação de identidade para garantir que estou em um ambiente 100% feminino.
* **Conexão:** Como jogadora de Fighting Games, quero filtrar parceiras por jogo (ex: Street Fighter) para treinar em um ambiente amigável.
* **Comunidade:** Como criadora, quero postar clips das minhas jogadas para receber apoio e feedback da comunidade.

### Proposta de Valor
* **Produtos e Serviços:** Rede social com matchmaking de squads e feed de comunidade moderado.
* **Aliviadores de Dor:** Filtro de toxicidade, verificação de identidade e sistema de denúncia ágil.
* **Criadores de Ganho:** Facilidade em encontrar times, ambiente de networking seguro e valorização do talento feminino.

---

##  3. Projeto de Interface

### Fluxo do Usuário
[Fluxo de usuário 1](images/flux1.jpeg)
[Fluxo de usuário 2](images/flux2.jpeg)
[Fluxo de usuário 3](images/flux3.jpeg)
[Fluxo de usuário 4](images/flux4.jpeg)


### Wireframes e Protótipos
* **Wireframes e Protótipo Interativo:** [TIAW](https://marvelapp.com/prototype/97c4340)

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
![Kanban](https://miro.com/app/board/uXjVGvS4FkI=/?share_link_id=386671505812)

* **To Do:** Projeto inicial em HTML e CSS.
* **Doing:** Identidade Visual.
* **Done:** Protótipos, user flow.
