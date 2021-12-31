import { withInstall } from '/@/utils';
import certInfo from './info.vue';
import certAttachments from './attachments.vue';
import certRecords from './records.vue';

export const CertInfo = withInstall(certInfo);
export const CertAttachments = withInstall(certAttachments);
export const CertRecords = withInstall(certRecords);
