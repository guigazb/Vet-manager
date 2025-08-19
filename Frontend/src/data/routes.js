const routes = {

    // Dashboard
    root: '/',
    dashboard: '/dashboard',
    dashboard_processos: '/dashboard-processos',
    dashboard_indicadores: '/dashboard-indicadores',
    dashboard_riscos: '/dashboard-riscos',

    // Processos
    processo_atualizar: '/processo-atualizar',
    processo_criar: '/processo-criar',
    processo_excluir: '/processo-excluir',
    processo_listar: '/processo-listar',

    // Indicadores
    indicadores_criar: '/indicador-cadastrar',
    indicadores_processo: '/indicador-processo',
    indicadores_dados: '/indicador-dados',


    // Riscos
    // Risco
    risco_criar: '/risco-cadastro',

    // Risco - matriz swot
    risco_swot: '/risco-swot',

    // Risco - causa - consequencia
    risco_causa_consequencia: '/risco-causa-consequencia',

    // Risco - controles
    risco_controle_existente: '/risco-controle-existente',

    // Risco - nivel controle
    risco_nivel_controle: '/risco-nivel-controle',

    // Risco - probabilidade
    risco_aval_prob_impacto: '/risco-aval-prob-impacto',

    // Risco - resposta
    risco_resposta_risco: '/risco-resposta-risco',

    // Risco - tabela Periodica
    risco_tabela_periodica: '/risco-tabela-periodica',

    // Risco - mapa de risco
    risco_mapa_risco: '/risco-mapa-risco',

    // Risco - categoria risco
    risco_categoria_risco_criar: '/risco-categoria-criar',
    risco_categoria_risco_listar: '/risco-categoria-listar',
    risco_categoria_risco_atualizar: '/risco-categoria-atualizar',
    risco_categoria_risco_excluir: '/risco-categoria-excluir',

    // Risco - Impacto
    risco_impacto_criar: '/risco-impacto-criar',
    risco_impacto_listar: '/risco-impacto-listar',
    risco_impacto_atualizar: '/risco-impacto-atualizar',
    risco_impacto_excluir: '/risco-impacto-excluir',

    // Risco - probabilidade
    risco_probabilidade_criar: '/risco-probabilidade-criar',
    risco_probabilidade_listar: '/risco-probabilidade-listar',
    risco_probabilidade_atualizar: '/risco-probabilidade-atualizar',
    risco_probabilidade_excluir: '/risco-probabilidade-excluir',
    

    // Gestão do Dia a Dia 
    gestao_dia_a_dia: 'gestao-dia-dia',

    // Auditoria
    auditoria_catalogo_controles: '/auditoria-catalogo-controles',
    auditoria_mapa_calor_controles: '/auditoria-mapa-calor-controles',
    auditoria_mapa_calor_processos: '/auditoria-mapa-calor-processos',
    auditoria_mapa_calor_indicadores: '/auditoria-mapa-calor-indicadores',
    auditoria_mapa_calor_riscos: '/auditoria-mapa-calor-riscos',

    // Relatórios
    relatorio_processo: '/relatorio-processo',
    relatorio_indicador: '/relatorio-indicador',
    relatorio_risco: '/relatorio-risco',

    // Configurações
    configuracao_geral: '/configuracao-geral',
    configuracao_meu_perfil: '/configuracao-meu-perfil',
    configuracao_notificacao: '/configuracao-notificacao',

    // Diversos
    // Diversos - Perfil
    diversos_perfil_criar: '/diversos-perfil-criar',
    diversos_perfil_atualizar: '/diversos-perfil-atualizar',
    diversos_perfil_listar: '/diversos-perfil-listar',
    diversos_perfil_excluir: '/diversos-perfil-excluir',

    // Diversos - Usuários
    diversos_usuario_atualizar: "/diversos-usuario-atualizar",
    diversos_usuario_criar: "/diversos-usuario-criar",
    diversos_usuario_excluir: "/diversos-usuario-excluir",
    diversos_usuario_listar: "/diversos-usuario-listar",

    // Diversos - Local de Execução
    diversos_local_execucao_criar: '/diversos-local-execucao-criar',
    diversos_local_execucao_listar: '/diversos-local-execucao-listar',
    diversos_local_execucao_atualizar: '/diversos-local-execucao-atualizar',
    diversos_local_execucao_excluir: '/diversos-local-execucao-excluir',

    // Diversos - Documento Normativo
    diversos_documento_normativo_criar: '/diversos-documento-normativo-criar',
    diversos_documento_normativo_listar: '/diversos-documento-normativo-listar',
    diversos_documento_normativo_atualizar: '/diversos-documento-normativo-atualizar',
    diversos_documento_normativo_excluir: '/diversos-documento-normativo-excluir',
    diversos_documento_por_processo: '/diversos-documento-normativo-por-processo',

    // Diversos - tipo Documento Normativo
    diversos_tipo_normativo_criar: '/diversos-tipo-normativo-criar',
    diversos_tipo_normativo_listar: '/diversos-tipo-normativo-listar',
    diversos_tipo_normativo_atualizar: '/diversos-tipo-normativo-atualizar',
    diversos_tipo_normativo_excluir: '/diversos-tipo-normativo-excluir',

    // Diversos - Unidade Funcional
    diversos_unidade_funcional_criar: '/diversos-unidade-funcional-criar',
    diversos_unidade_funcional_listar: '/diversos-unidade-funcional-listar',
    diversos_unidade_funcional_atualizar: '/diversos-unidade-funcional-atualizar',
    diversos_unidade_funcional_excluir: '/diversos-unidade-funcional-excluir',

    // Diversos - Tipo de Unidade Funcional
    diversos_tipo_unidade_funcional_criar: '/diversos-tipo-unidade-funcional-criar',
    diversos_tipo_unidade_funcional_listar: '/diversos-tipo-unidade-funcional-listar',
    diversos_tipo_unidade_funcional_atualizar: '/diversos-tipo-unidade-funcional-atualizar',
    diversos_tipo_unidade_funcional_excluir: '/diversos-tipo-unidade-funcional-excluir',

    // Diversos - Ferramenta de sistema
    diversos_ferramenta_sistema_criar: '/diversos-ferramenta-sistema-criar',
    diversos_ferramenta_sistema_listar: '/diversos-ferramenta-sistema-listar',
    diversos_ferramenta_sistema_atualizar: '/diversos-ferramenta-sistema-atualizar',
    diversos_ferramenta_sistema_excluir: '/diversos-ferramenta-sistema-excluir',
    diversos_ferramenta_por_processo: '/diversos-ferramenta-por-processo',

    // Diversos - Permissao
    diversos_permissao_criar: '/diversos-permissao-criar',
    diversos_permissao_listar: '/diversos-permissao-listar',
    diversos_permissao_atualizar: '/diversos-permissao-atualizar',
    diversos_permissao_excluir: '/diversos-permissao-excluir',

    // Diversos - Permissao
    diversos_permissao_por_perfil_configurar: '/diversos-permissao-por-perfil-configurar',

    // Diversos - Permissao Grupo
    diversos_permissao_grupo_criar: '/diversos-permissao-grupo-criar',
    diversos_permissao_grupo_listar: '/diversos-permissao-grupo-listar',
    diversos_permissao_grupo_atualizar: '/diversos-permissao-grupo-atualizar',
    diversos_permissao_grupo_excluir: '/diversos-permissao-grupo-excluir',

};

export default routes;