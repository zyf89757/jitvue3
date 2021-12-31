import { withInstall } from '/@/utils';
import productList from './productInformationShow.vue';
import certAttachments from './attachments.vue';
import bingCertificate from './certificatesToBinding.vue';
import productHistory from './productHistoryImport.vue';

export const CertAttachments = withInstall(certAttachments);
export const ProductList = withInstall(productList);
export const BingCertificate = withInstall(bingCertificate);
export const ProductHistory = withInstall(productHistory);
