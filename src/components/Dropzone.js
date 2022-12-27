import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useFormContext } from 'react-hook-form';
import './Dropzone.css';

export function Dropzone({ name }) {
   const { setValue, control } = useFormContext();
   const [files, setFiles] = useState([]);
   const [error, setError] = useState("");

   const { getRootProps, getInputProps } = useDropzone({
      accept: {
         'image/*': []
      },
      multiple: false,
      maxSize: 100000,
      maxFiles: 1,
      onDrop: (acceptedFiles, fileRejections) => {
         setValue(name, acceptedFiles[0]);
         setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
         })));
         setError("");
         fileRejections.forEach((file) => {
            file.errors.forEach((err) => {
               if (err.code === "file-invalid-type") {
                  setError(`Error: ${err.message}`);
               }
               if (err.code === "file-too-large") {
                  setError(`Error: ${err.message}`);
               }
            });
         });
      }
   });

   const thumbs = files.map(file => (
      <div className='thumb' key={file.name}>
         <div className='thumbInner'>
            <img
               src={file.preview}
               className="img"
               onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
         </div>
      </div>
   ));

   useEffect(() => {
      return () =>
         files.forEach(file => URL.revokeObjectURL(file.preview));
   }, []);

   return (
      <Controller
         control={control}
         name={name}
         defaultValue={[]}
         render={() => (<>
            <section className="drop-file-input">
               <div {...getRootProps({ className: 'drop-file-input__label' })}>
                  <CloudUploadIcon />
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop your avatar image here, or click to select</p>
                  <p>(avatar is optional)</p>
               </div>
            </section>
            <aside className="thumbsContainer">
               {thumbs}
            </aside>
            {error && <p className='error'>{error}</p>}
         </>)}
      />
   );
}
