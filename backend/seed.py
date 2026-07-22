from werkzeug.security import generate_password_hash

from .database import get_database


DEMO_USERNAME = "teste"
DEMO_PASSWORD = "teste123"

FAMOUS_POEMS = (
    {
        "title": "Canção do Exílio",
        "author": "Gonçalves Dias",
        "category": "Saudade",
        "source_url": "https://pt.wikisource.org/wiki/Can%C3%A7%C3%A3o_do_Ex%C3%ADlio_%28Gon%C3%A7alves_Dias%29",
        "content": """Minha terra tem palmeiras,
Onde canta o Sabiá;
As aves, que aqui gorjeiam,
Não gorjeiam como lá.

Nosso céu tem mais estrelas,
Nossas várzeas têm mais flores,
Nossos bosques têm mais vida,
Nossa vida mais amores.

Em cismar, sozinho, à noite,
Mais prazer encontro eu lá;
Minha terra tem palmeiras,
Onde canta o Sabiá.

Minha terra tem primores,
Que tais não encontro eu cá;
Em cismar, sozinho, à noite,
Mais prazer encontro eu lá;
Minha terra tem palmeiras,
Onde canta o Sabiá.

Não permita Deus que eu morra,
Sem que eu volte para lá;
Sem que desfrute os primores
Que não encontro por cá;
Sem qu'inda aviste as palmeiras,
Onde canta o Sabiá.""",
    },
    {
        "title": "Via Láctea — XIII",
        "author": "Olavo Bilac",
        "category": "Contemplação",
        "source_url": "https://pt.wikisource.org/wiki/Via_L%C3%A1ctea",
        "content": """Ora (direis) ouvir estrelas! Certo
Perdeste o senso! E eu vos direi, no entanto,
Que, para ouvi-las, muita vez desperto
E abro as janelas, pálido de espanto...

E conversamos toda a noite, enquanto
A via-láctea, como um pálio aberto,
Cintila. E, ao vir do sol, saudoso e em pranto,
Inda as procuro pelo céu deserto.

Direis agora: Tresloucado amigo!
Que conversas com elas? Que sentido
Tem o que dizem, quando estão contigo?

E eu vos direi: Amai para entendê-las!
Pois só quem ama pode ter ouvido
Capaz de ouvir e de entender estrelas.""",
    },
    {
        "title": "As Pombas",
        "author": "Raimundo Correia",
        "category": "Reflexão",
        "source_url": "https://pt.wikisource.org/wiki/As_Pombas...",
        "content": """Vai-se a primeira pomba despertada...
Vai-se outra mais... mais outra... enfim dezenas
De pombas vão-se dos pombais, apenas
Raia sanguínea e fresca a madrugada...

E à tarde, quando a rígida nortada
Sopra, aos pombais de novo elas, serenas,
Ruflando as asas, sacudindo as penas,
Voltam todas em bando e em revoada...

Também dos corações onde abotoam,
Os sonhos, um por um, céleres voam,
Como voam as pombas dos pombais;

No azul da adolescência as asas soltam,
Fogem... Mas aos pombais as pombas voltam,
E eles aos corações não voltam mais...""",
    },
    {
        "title": "Círculo Vicioso",
        "author": "Machado de Assis",
        "category": "Reflexão",
        "source_url": "https://pt.wikisource.org/wiki/C%C3%ADrculo_Vicioso",
        "content": """Bailando no ar, gemia inquieto vaga-lume:
Quem me dera que eu fosse aquela loira estrela
Que arde no eterno azul, como uma eterna vela!
Mas a estrela, fitando a lua, com ciúme:

Pudesse eu copiar-te o transparente lume,
Que, da grega coluna à gótica janela,
Contemplou, suspirosa, a fronte amada e bela.
Mas a lua, fitando o sol com azedume:

Mísera! Tivesse eu aquela enorme, aquela
Claridade imortal, que toda a luz resume!
Mas o sol, inclinando a rútila capela:

Pesa-me esta brilhante auréola de nume...
Enfara-me esta luz e desmedida umbela...
Por que não nasci eu um simples vaga-lume?""",
    },
    {
        "title": "Mal Secreto",
        "author": "Raimundo Correia",
        "category": "Reflexão",
        "source_url": "https://pt.wikisource.org/wiki/Mal_Secreto",
        "content": """Se a cólera que espuma, a dor que mora
N'alma, e destrói cada ilusão que nasce,
Tudo o que punge, tudo o que devora
O coração, no rosto se estampasse;

Se se pudesse o espírito que chora
Ver através da máscara da face,
Quanta gente, talvez, que inveja agora
Nos causa, então piedade nos causasse!

Quanta gente que ri, talvez, consigo
Guarda um atroz, recôndito inimigo,
Como invisível chaga cancerosa!

Quanta gente que ri, talvez existe,
Cuja ventura única consiste
Em parecer aos outros venturosa!""",
    },
)


def seed_database():
    database = get_database()
    database.execute(
        "INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)",
        (DEMO_USERNAME, generate_password_hash(DEMO_PASSWORD)),
    )
    demo_user = database.execute(
        "SELECT id FROM users WHERE username = ?", (DEMO_USERNAME,)
    ).fetchone()

    for poem in FAMOUS_POEMS:
        database.execute(
            """
            INSERT OR IGNORE INTO poems
              (user_id, title, author, content, category, source_url, is_seed)
            VALUES (?, ?, ?, ?, ?, ?, 1)
            """,
            (
                demo_user["id"],
                poem["title"],
                poem["author"],
                poem["content"],
                poem["category"],
                poem["source_url"],
            ),
        )
    database.commit()
