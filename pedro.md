# Justificativa de Adoção de Banco de Dados NoSQL (MongoDB)

> **Projeto Integrador — SENAC | Disciplina: Banco de Dados**  
> Para armazenamento de sumários e alertas imprevisíveis gerados pela IA Gemini

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | Junho de 2026 |
| Disciplina | Banco de Dados / Projeto Integrador |
| Tecnologia avaliada | MongoDB + Google Gemini |

---

## Sumário

1. [Introdução](#1-introdução)
2. [Contexto do problema](#2-contexto-do-problema)
3. [Por que NoSQL?](#3-por-que-nosql)
4. [MongoDB como solução adotada](#4-mongodb-como-solução-adotada)
5. [Modelagem dos dados no MongoDB](#5-modelagem-dos-dados-no-mongodb)
6. [Arquitetura de integração](#6-arquitetura-de-integração)
7. [Considerações finais](#7-considerações-finais)
8. [Referências](#8-referências)

---

## 1. Introdução

Este documento tem como objetivo apresentar e justificar tecnicamente a escolha do banco de dados não relacional **MongoDB** como solução de persistência para os dados gerados pelo módulo de inteligência artificial do projeto, baseado na **API Google Gemini**.

O sistema em desenvolvimento utiliza o modelo Gemini para processar informações e produzir dois tipos principais de saída: *sumários textuais estruturados* e *alertas imprevisíveis*. A natureza dessas saídas demanda uma solução de armazenamento flexível, escalável e de alto desempenho — características que bancos de dados relacionais tradicionais não atendem de forma satisfatória neste contexto.

---

## 2. Contexto do problema

### 2.1 Saídas geradas pela IA

O módulo Gemini gera dois tipos de dados que precisam ser persistidos:

- **Sumários:** textos descritivos de tamanho variável, gerados a partir do processamento de documentos, eventos ou consultas do usuário.
- **Alertas imprevisíveis:** notificações geradas dinamicamente pela IA, cujos campos, criticidade, contexto e estrutura variam a cada geração, sem um esquema fixo previamente definido.

> ⚠️ **Ponto crítico:** como o Gemini decide autonomamente quais informações incluir em cada alerta, não é possível definir antecipadamente um esquema rígido de colunas ou atributos — característica fundamental que inviabiliza o uso de um banco relacional tradicional.

### 2.2 Limitações do modelo relacional

Em bancos SQL (MySQL, PostgreSQL), todos os registros seguem o mesmo esquema de colunas. Para este caso de uso, isso gera problemas:

- Qualquer campo novo exige `ALTER TABLE` — operação custosa e arriscada em produção.
- Alertas com estruturas distintas geram muitos campos nulos, desperdiçando espaço e complicando queries.
- Modelagem EAV (entidade-atributo-valor) necessária para dados variáveis prejudica legibilidade e desempenho.
- JOINs complexos para reconstituir documentos aninhados aumentam a latência das consultas.

---

## 3. Por que NoSQL?

Os bancos de dados NoSQL surgiram para atender casos onde flexibilidade de esquema, escalabilidade horizontal e alto desempenho são prioritários. Existem quatro categorias principais:

| Tipo | Exemplos | Melhor para |
|---|---|---|
| **Documento** | MongoDB, CouchDB | Dados semiestruturados, JSON flexível |
| Chave-Valor | Redis, DynamoDB | Cache, sessões de alta velocidade |
| Colunar | Cassandra, HBase | Análise de grandes volumes |
| Grafos | Neo4j, ArangoDB | Relacionamentos complexos |

> ✅ Para este projeto, o banco **orientado a documentos** é o ideal: sumários e alertas são naturalmente representados como documentos JSON, com estrutura aninhada e variável.

---

## 4. MongoDB como solução adotada

### 4.1 O que é o MongoDB?

O MongoDB é um banco de dados NoSQL orientado a documentos, de código aberto, desenvolvido pela MongoDB Inc. Os dados são armazenados em formato **BSON (Binary JSON)**, permitindo documentos ricos, aninhados e com esquema flexível dentro de uma mesma coleção.

### 4.2 Justificativas técnicas

**a) Schema flexível (Schema-less)**

O MongoDB não exige que todos os documentos de uma coleção possuam os mesmos campos. Cada alerta gerado pelo Gemini pode conter atributos únicos (como `componentes_afetados`, `probabilidade_falha`, `acoes_sugeridas`) sem necessidade de alterar a estrutura do banco. Isso elimina migrações de schema e torna o sistema resiliente à evolução dos modelos de IA.

**b) Armazenamento nativo de JSON/BSON**

As respostas do Gemini chegam ao sistema no formato JSON. O MongoDB armazena esses documentos diretamente, sem necessidade de mapeamento objeto-relacional (ORM) ou transformações de dados. Isso reduz a complexidade do código e melhora o desempenho.

**c) Escalabilidade horizontal (Sharding)**

À medida que o volume de sumários e alertas cresce, o MongoDB permite distribuir os dados horizontalmente entre múltiplos servidores (sharding), sem downtime. Bancos relacionais escalam primariamente de forma vertical, o que é mais custoso.

**d) Alta disponibilidade com Replica Sets**

O MongoDB suporta conjuntos de réplicas nativamente, garantindo que os dados dos alertas críticos estejam sempre disponíveis mesmo em caso de falha de um nó.

**e) Consultas poderosas e índices**

Apesar de ser NoSQL, o MongoDB oferece uma linguagem de consulta rica (MQL), suporte a índices compostos, busca em campos aninhados e operadores de agregação, permitindo análises eficientes sobre o histórico de alertas e sumários.

### 4.3 Comparativo: MongoDB vs. SQL relacional

| Critério | MongoDB (NoSQL) | SQL Relacional |
|---|---|---|
| Schema variável por alerta | ✅ Nativo | ❌ Requer migrações |
| Armazenamento JSON direto | ✅ BSON nativo | ❌ Requer ORM |
| Escalabilidade horizontal | ✅ Sharding | ⚠️ Complexo/caro |
| Documentos aninhados | ✅ Total | ❌ Múltiplos JOINs |
| Escrita intensiva (IA/IoT) | ✅ Alta performance | ⚠️ Menor throughput |
| Transações ACID completas | ⚠️ Disponível (v4+) | ✅ Nativo |
| Relacionamentos complexos | ⚠️ Referências manuais | ✅ JOINs nativos |

---

## 5. Modelagem dos dados no MongoDB

### Coleção: `sumarios`

Exemplo de documento armazenado para um sumário gerado pelo Gemini:

```json
{
  "_id": "ObjectId(\"66bc3f2a1d4e5a0012345678\")",
  "tipo": "sumario",
  "modelo_ia": "gemini-pro",
  "criado_em": "2026-06-26T10:30:00Z",
  "texto": "O sistema identificou pico de acessos entre 10h e 11h...",
  "tokens_utilizados": 420,
  "metadados": {
    "usuario_id": "u_0042",
    "contexto": "dashboard"
  }
}
```

### Coleção: `alertas` — estrutura variável gerada pela IA

Exemplo de alerta com campos únicos definidos dinamicamente pelo Gemini:

```json
{
  "_id": "ObjectId(\"67cd4a3b2e5f6b0023456789\")",
  "tipo": "alerta",
  "nivel": "CRITICO",
  "criado_em": "2026-06-26T10:35:00Z",
  "mensagem": "Anomalia detectada no módulo de pagamentos.",
  "componentes_afetados": ["pagamentos", "gateway"],
  "probabilidade_falha": 0.87,
  "acoes_sugeridas": [
    "Verificar logs do gateway",
    "Acionar equipe de plantão"
  ]
}
```

> **Nota:** os campos `componentes_afetados` e `probabilidade_falha` estão presentes neste alerta, mas podem estar ausentes em outros tipos de alerta gerados pelo Gemini. O MongoDB armazena ambos na mesma coleção sem qualquer conflito de esquema.

---

## 6. Arquitetura de integração

O fluxo de integração entre a IA Gemini e o MongoDB no projeto segue as seguintes etapas:

```
Usuário/Sistema → Requisição → API Gemini → JSON retornado → Backend → MongoDB
```

1. O usuário ou sistema dispara uma requisição para o módulo de IA.
2. A API Gemini processa a entrada e retorna um objeto JSON com o sumário ou alerta.
3. O backend recebe o JSON e realiza uma inserção **direta** na coleção MongoDB, sem transformações.
4. A aplicação consulta o MongoDB para exibir histórico de alertas e sumários ao usuário.
5. O MongoDB indexa automaticamente os campos mais consultados (`nivel`, `criado_em`, `tipo`) para garantir baixa latência.

---

## 7. Considerações finais

A adoção do MongoDB como banco de dados para armazenamento de sumários e alertas gerados pelo Gemini é tecnicamente justificada pelos seguintes pilares:

- **Flexibilidade de esquema** — essencial para dados imprevisíveis gerados por IA.
- **Compatibilidade nativa com JSON** — elimina camadas de transformação e simplifica o código.
- **Escalabilidade e disponibilidade** — o sistema cresce sem grandes refatorações de infraestrutura.
- **Desempenho em escrita intensiva** — adequado para sistemas que geram grandes volumes de alertas em tempo real.
- **Maturidade e ecossistema** — amplamente adotado no mercado, com integração facilitada com Node.js, Python e outras tecnologias modernas.

> ✅ Conclui-se que o MongoDB atende plenamente aos requisitos técnicos e funcionais do projeto, sendo a escolha mais adequada e moderna para o armazenamento das saídas geradas pelo módulo de inteligência artificial Gemini.

---

## 8. Referências

- MongoDB Documentation. Disponível em: <https://www.mongodb.com/docs>
- Google AI — Gemini API. Disponível em: <https://ai.google.dev>
- Fowler, M.; Sadalage, P. J. *NoSQL Distilled.* Addison-Wesley, 2012.
- Chodorow, K. *MongoDB: The Definitive Guide.* O'Reilly Media, 2019.
- SENAC — Material didático da disciplina de Banco de Dados, 2026.

---

*SENAC · Projeto Integrador · Banco de Dados · 2026 · v1.0*

