import type { HTMLAttributes, ReactNode } from 'react';

export interface UploadFile {
  /** Unique identifier for the file. */
  id: string;
  /** File name. */
  name: string;
  /** File size in bytes. */
  size?: number;
  /** Current upload status. */
  status?: 'uploading' | 'done' | 'error';
  /** Upload progress percentage (0-100). */
  progress?: number;
  /** URL of the uploaded file. */
  url?: string;
}

export interface UploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Accepted file types (e.g. "image/*,.pdf"). */
  accept?: string;
  /** Allow multiple files. */
  multiple?: boolean;
  /** Disable the upload control. */
  disabled?: boolean;
  /** Maximum file size in bytes. */
  maxSize?: number;
  /** Controlled list of files. */
  fileList?: UploadFile[];
  /** Callback when the file list changes. */
  onChange?: (files: UploadFile[]) => void;
  /** Callback when a file is removed. */
  onRemove?: (file: UploadFile) => void;
  /** Called before a file is added. Return false to reject. */
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  /** Custom trigger content. */
  children?: ReactNode;
  /** Upload appearance mode. */
  appearance?: 'button' | 'dragger';
}
