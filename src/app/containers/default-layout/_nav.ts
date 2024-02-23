import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Empresas'
  },
  {
    name: 'Cadastro de empresas',
    url: 'empresas/criar',
  },
  {
    name: 'Dashboards cadastrados',
    url: 'empresas/listar'
  },
];
