const routes = {

    // Root
    root: '/',

    // HomePage
    homepage: '/homepage',

    //Login
    login: '/login',

    // Dashboard
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
    indicadores_criar: '/indicador-criar',
    indicadores_atualizar: '/indicador-atualizar',
    indicadores_excluir: '/indicador-excluir',
    indicadores_listar: '/indicador-listar',

    indicadores_processo: '/indicador-processo',
    indicadores_dados: '/indicador-dados',

    // Riscos -----------------------------------------------------------------------------------

    // Risco
    risco_criar: '/risco-criar',
    risco_atualizar: '/risco-atualizar',
    risco_excluir: '/risco-excluir',
    risco_listar: '/risco-listar',


    // Risco - controles
    risco_controle_existente_criar: '/cadastro-risco-controle-existente-criar',
    risco_controle_existente_listar: '/cadastro-risco-controle-existente-listar',
    risco_controle_existente_atualizar: '/cadastro-risco-controle-existente-atualizar',
    risco_controle_existente_excluir: '/cadastro-risco-controle-existente-excluir',

    // Risco - probabilidade
    risco_aval_prob_impacto_listar: '/risco-aval-prob-impacto-listar',
    risco_aval_prob_impacto_criar: '/risco-aval-prob-impacto-criar',
    risco_aval_prob_impacto_atualizar: '/risco-aval-prob-impacto-atualizar',
    risco_aval_prob_impacto_excluir: '/risco-aval-prob-impacto-excluir',

    // Risco - resposta
    risco_resposta_risco_criar: '/cadastro-risco-resposta-risco-criar',
    risco_resposta_risco_listar: '/cadastro-risco-resposta-risco-listar',
    risco_resposta_risco_atualizar: '/cadastro-risco-resposta-risco-atualizar',
    risco_resposta_risco_excluir: '/cadastro-risco-resposta-risco-excluir',

    // Risco - tabela Periodica
    risco_tabela_periodica_listar: '/risco-tabela-periodica-listar',
    risco_tabela_periodica_visualizar: '/risco-tabela-periodica-visualizar',

    // Risco - categoria risco
    risco_categoria_risco_criar: '/cadastro-risco-categoria-criar',
    risco_categoria_risco_listar: '/cadastro-risco-categoria-listar',
    risco_categoria_risco_atualizar: '/cadastro-risco-categoria-atualizar',
    risco_categoria_risco_excluir: '/cadastro-risco-categoria-excluir',

    // Risco - Impacto
    risco_impacto_criar: '/cadastro-risco-impacto-criar',
    risco_impacto_listar: '/cadastro-risco-impacto-listar',
    risco_impacto_atualizar: '/cadastro-risco-impacto-atualizar',
    risco_impacto_excluir: '/cadastro-risco-impacto-excluir',

    // Risco - probabilidade
    risco_probabilidade_criar: '/cadastro-risco-probabilidade-criar',
    risco_probabilidade_listar: '/cadastro-risco-probabilidade-listar',
    risco_probabilidade_atualizar: '/cadastro-risco-probabilidade-atualizar',
    risco_probabilidade_excluir: '/cadastro-risco-probabilidade-excluir',

    // Risco - Operação Controle
    risco_operacao_controle_criar: '/cadastro-risco-operacao-controle-criar',
    risco_operacao_controle_listar: '/cadastro-risco-operacao-controle-listar',
    risco_operacao_controle_atualizar: '/cadastro-risco-operacao-controle-atualizar',
    risco_operacao_controle_excluir: '/cadastro-risco-operacao-controle-excluir',

    // Risco - Desenho Controle
    risco_desenho_controle_criar: '/risco-desenho-controle-criar',
    risco_desenho_controle_listar: '/risco-desenho-controle-listar',
    risco_desenho_controle_atualizar: '/risco-desenho-controle-atualizar',
    risco_desenho_controle_excluir: '/risco-desenho-controle-excluir',

    // Risco - Tipo Controle Ação
    risco_tipo_controle_acao_criar: '/cadastro-risco-tipo-controle-acao-criar',
    risco_tipo_controle_acao_listar: '/cadastro-risco-tipo-controle-acao-listar',
    risco_tipo_controle_acao_atualizar: '/cadastro-risco-tipo-controle-acao-atualizar',
    risco_tipo_controle_acao_excluir: '/cadastro-risco-tipo-controle-acao-excluir',

    // Risco - Nivel Real
    risco_nivel_real_criar: '/cadastro-risco-nivel-real-criar',
    risco_nivel_real_listar: '/cadastro-risco-nivel-real-listar',
    risco_nivel_real_atualizar: '/cadastro-risco-nivel-real-atualizar',
    risco_nivel_real_excluir: '/cadastro-risco-nivel-real-excluir',

    // Risco - Matriz Controle
    risco_matriz_controle_criar: '/cadastro-risco-matriz-controle-criar',
    risco_matriz_controle_listar: '/cadastro-risco-matriz-controle-listar',
    risco_matriz_controle_atualizar: '/cadastro-risco-matriz-controle-atualizar',
    risco_matriz_controle_excluir: '/cadastro-risco-matriz-controle-excluir',

    // Risco - Resposta Evento
    risco_resposta_evento_criar: '/cadastro-risco-resposta-evento-criar',
    risco_resposta_evento_listar: '/cadastro-risco-resposta-evento-listar',
    risco_resposta_evento_atualizar: '/cadastro-risco-resposta-evento-atualizar',
    risco_resposta_evento_excluir: '/cadastro-risco-resposta-evento-excluir',

    // Risco - Plano Resposta
    risco_plano_resposta_criar: '/risco-plano-resposta-criar',
    risco_plano_resposta_listar: '/risco-plano-resposta-listar',
    risco_plano_resposta_atualizar: '/risco-plano-resposta-atualizar',
    risco_plano_resposta_excluir: '/risco-plano-resposta-excluir',

    // Risco - Plano Resposta Ação
    risco_plano_resposta_acao_criar: '/risco-plano-resposta-acao-criar',
    risco_plano_resposta_acao_listar: '/risco-plano-resposta-acao-listar',
    risco_plano_resposta_acao_atualizar: '/risco-plano-resposta-acao-atualizar',
    risco_plano_resposta_acao_excluir: '/risco-plano-resposta-acao-excluir',

    // Risco - Matriz Swot
    risco_matriz_swot_listar: '/risco-matriz-swot-listar',
    risco_matriz_swot_visualizar: '/risco-matriz-swot-visualizar',
    risco_matriz_swot_editar: '/risco-matriz-swot-editar',

    // Risco - Causa
    risco_causa_criar: '/risco-causa-criar',
    risco_causa_listar: '/risco-causa-listar',
    risco_causa_atualizar: '/risco-causa-atualizar',
    risco_causa_excluir: '/risco-causa-excluir',

    // Risco - Consequencia
    risco_consequencia_criar: '/risco-consequencia-criar',
    risco_consequencia_listar: '/risco-consequencia-listar',
    risco_consequencia_atualizar: '/risco-consequencia-atualizar',
    risco_consequencia_excluir: '/risco-consequencia-excluir',

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
    diversos_usuario_modificar_senha: "/diversos_usuario_modificar_senha",

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

    // Diversos - Tags
    diversos_tags_criar: '/diversos-tags-criar',
    diversos_tags_listar: '/diversos-tags-listar',
    diversos_tags_atualizar: '/diversos-tags-atualizar',
    diversos_tags_excluir: '/diversos-tags-excluir',
};

export default routes;