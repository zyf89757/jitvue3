import { Icon } from './Icon';
import { Button } from './Button';
import { Card } from './Card';
import { PageWrapper } from '/@/components/EzControls/EzPage';
// import { DataGrid, DxColumn as Column } from './DxDataGrid';
import {
  // Need
  Button as AntButton,
  Input,
  List,
  Row,
  Col,
  Alert
} from 'ant-design-vue';

import { App } from 'vue';

const compList = [Icon, AntButton.Group, Card, List, Col, Row, Alert, PageWrapper];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Card);
}

// import type { App } from 'vue';
// import { Button } from './Button';
// import { Input, Layout } from 'ant-design-vue';

// export function registerGlobComp(app: App) {
//   app.use(Input).use(Button).use(Layout);
// }
