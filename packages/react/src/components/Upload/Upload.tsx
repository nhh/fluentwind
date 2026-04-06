import { forwardRef, useState, useRef, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { UploadProps, UploadFile } from './Upload.types';

const draggerVariants = cva(
  'flex flex-col items-center justify-center gap-s px-m py-l rounded-medium border-2 border-dashed border-neutral-stroke-2 transition-colors duration-fast cursor-pointer',
  {
    variants: {
      isDragOver: {
        true: 'border-brand-stroke-1 bg-subtle-background-hover',
        false: 'bg-neutral-background-1 hover:border-neutral-stroke-2-hover hover:bg-subtle-background-hover',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50 hover:bg-neutral-background-1 hover:border-neutral-stroke-2',
        false: '',
      },
    },
    defaultVariants: {
      isDragOver: false,
      disabled: false,
    },
  },
);

const CloudUploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="h-8 w-8 text-neutral-foreground-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 3.75 3.75 0 013.572 5.345A4.5 4.5 0 0118 19.5H6.75z"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 text-neutral-foreground-3 shrink-0"
  >
    <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l3.122 3.12a1.5 1.5 0 01.439 1.061V16.5A1.5 1.5 0 0114.5 18h-10A1.5 1.5 0 013 16.5v-13z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 text-palette-green-foreground-1 shrink-0"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 text-palette-red-foreground-1 shrink-0"
  >
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

const RemoveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

function formatFileSize(bytes?: number): string {
  if (bytes === undefined || bytes === null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

let fileIdCounter = 0;
function generateFileId(): string {
  fileIdCounter += 1;
  return `upload-${Date.now()}-${fileIdCounter}`;
}

export const Upload = forwardRef<HTMLDivElement, UploadProps>(
  (
    {
      accept,
      multiple = false,
      disabled = false,
      maxSize,
      fileList: controlledFileList,
      onChange,
      onRemove,
      beforeUpload,
      children,
      appearance = 'button',
      className,
      ...props
    },
    ref,
  ) => {
    const [internalFileList, setInternalFileList] = useState<UploadFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList;

    const updateFileList = useCallback(
      (newList: UploadFile[]) => {
        setInternalFileList(newList);
        onChange?.(newList);
      },
      [onChange],
    );

    const processFiles = useCallback(
      async (nativeFiles: FileList | File[]) => {
        const files = Array.from(nativeFiles);
        const newUploadFiles: UploadFile[] = [];

        for (const file of files) {
          if (maxSize && file.size > maxSize) continue;

          if (beforeUpload) {
            const result = await beforeUpload(file);
            if (!result) continue;
          }

          newUploadFiles.push({
            id: generateFileId(),
            name: file.name,
            size: file.size,
            status: 'done',
            progress: 100,
          });
        }

        if (newUploadFiles.length > 0) {
          const updated = multiple ? [...fileList, ...newUploadFiles] : newUploadFiles;
          updateFileList(updated);
        }
      },
      [fileList, maxSize, multiple, beforeUpload, updateFileList],
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          processFiles(e.target.files);
        }
        // Reset so re-selecting the same file triggers change
        e.target.value = '';
      },
      [processFiles],
    );

    const handleTriggerClick = useCallback(() => {
      if (!disabled) {
        inputRef.current?.click();
      }
    }, [disabled]);

    const handleRemove = useCallback(
      (file: UploadFile) => {
        const updated = fileList.filter((f) => f.id !== file.id);
        updateFileList(updated);
        onRemove?.(file);
      },
      [fileList, updateFileList, onRemove],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragOver(true);
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (!disabled && e.dataTransfer.files.length > 0) {
          processFiles(e.dataTransfer.files);
        }
      },
      [disabled, processFiles],
    );

    const hiddenInput = (
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden
      />
    );

    const fileListUI = fileList.length > 0 && (
      <ul className="flex flex-col gap-xxs mt-s">
        {fileList.map((file) => (
          <li
            key={file.id}
            className={cn(
              'flex items-center gap-s px-s py-xs rounded-medium text-200 leading-200',
              'bg-neutral-background-2 text-neutral-foreground-1',
              file.status === 'error' && 'text-palette-red-foreground-1',
            )}
          >
            <FileIcon />
            <span className="flex-1 truncate">{file.name}</span>
            {file.size !== undefined && (
              <span className="text-neutral-foreground-3 text-200 shrink-0">
                {formatFileSize(file.size)}
              </span>
            )}
            {file.status === 'done' && <CheckIcon />}
            {file.status === 'error' && <ErrorIcon />}
            {file.status === 'uploading' && (
              <span className="text-neutral-foreground-3 text-200 shrink-0">
                {file.progress ?? 0}%
              </span>
            )}
            <button
              type="button"
              onClick={() => handleRemove(file)}
              aria-label={`Remove ${file.name}`}
              className={cn(
                'inline-flex items-center justify-center text-neutral-foreground-3 hover:text-neutral-foreground-1 rounded-medium',
                'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              )}
            >
              <RemoveIcon />
            </button>
            {file.status === 'uploading' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-background-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-background transition-all duration-normal"
                  style={{ width: `${file.progress ?? 0}%` }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    );

    return (
      <div ref={ref} className={cn('inline-flex flex-col', className)} {...props}>
        {hiddenInput}

        {appearance === 'button' && (
          <button
            type="button"
            onClick={handleTriggerClick}
            disabled={disabled}
            className={cn(
              'inline-flex items-center justify-center font-semibold text-300 leading-300 gap-xs px-m py-xs rounded-medium border border-neutral-stroke-1',
              'bg-neutral-background-1 text-neutral-foreground-1',
              'hover:bg-neutral-background-1-hover hover:border-neutral-stroke-1-hover',
              'active:bg-neutral-background-1-pressed',
              'cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
              disabled &&
                'bg-neutral-background-disabled text-neutral-foreground-disabled border-neutral-stroke-disabled cursor-not-allowed',
            )}
          >
            {children ?? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Upload
              </>
            )}
          </button>
        )}

        {appearance === 'dragger' && (
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={handleTriggerClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTriggerClick();
              }
            }}
            className={cn(draggerVariants({ isDragOver, disabled }))}
          >
            {children ?? (
              <>
                <CloudUploadIcon />
                <div className="flex flex-col items-center gap-xxs">
                  <span className="text-300 font-semibold leading-300 text-neutral-foreground-1">
                    Click or drag files to upload
                  </span>
                  <span className="text-200 leading-200 text-neutral-foreground-3">
                    {accept
                      ? `Supported formats: ${accept}`
                      : 'Any file type supported'}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {fileListUI}
      </div>
    );
  },
);

Upload.displayName = 'Upload';
