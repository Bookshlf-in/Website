import { useState } from "react";
import axios from "../../../api/axios";

// MUI Components
import { Stack, Alert, Chip, Divider } from "@mui/material";
import { Tooltip } from "@mui/material";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// assets
import LoadingButton from "../../../assets/components/buttons/loadingbutton";
import SimpleButton from "../../../assets/components/buttons/button";

// FilePond Components for image Uploading
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//  Image Compression
import imageCompression from "browser-image-compression";

// MUI Icons
import UploadIcon from "@mui/icons-material/CloudUpload";
import CopyIcon from "@mui/icons-material/ContentCopy";
import CopiedIcon from "@mui/icons-material/Check";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const BookshlfImageUploadUtility = () => {
  const [Image, setImage] = useState([]);
  const [sending, setSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [alert, setalert] = useState({
    show: false,
    type: "info",
    msg: "",
  });

  // Image Compression before Book Image Upload
  const handleImageCompress = async (imgFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      fileType: "image/png",
    };
    const res = await imageCompression(imgFile, options)
      .then((compressedFile) => {
        return compressedFile;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return res;
  };

  // uploading images to google cloud server

  // Image Size Validator
  const validateSize = () => {
    const invalidFiles = [];
    for (let i = 0; i < Image.length; i++) {
      const fileSize = Image[i].size / 1024 / 1024; // in MiB
      if (fileSize > 5) {
        invalidFiles.push(Image[i]);
      }
    }
    if (invalidFiles.length) {
      let invalidFileNames = "";
      invalidFiles.forEach((invalidFile, index) => {
        if (index > 0) {
          invalidFileNames = invalidFileNames + ", " + invalidFile.name;
        } else invalidFileNames = invalidFile.name;
      });
      setalert({
        show: true,
        type: "error",
        msg: "Cannot Upload " + invalidFileNames + " has size greater than 5MB",
      });
      setTimeout(() => {
        setalert({
          show: false,
          type: "info",
          msg: "",
        });
      }, 10000);

      return false;
    }
    return true;
  };

  // uploading single image File
  const uploadSingleImage = async (file) => {
    const formData = new FormData();
    formData.append("folder", "sellingBooks");
    formData.append("file", file);

    const result = await axios({
      method: "post",
      url: "/uploadFile",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return {
          name: file.name,
          sizeinKB: file.size / 1024,
          url: response.data.link,
        };
      })
      .catch((error) => {
        console.log(error.response.data);
        return {
          name: file.name,
          sizeinKB: file.size / 1024,
          url: null,
          error: error.response.data,
        };
      });

    return result;
  };

  // uploading All Images of Books
  const uploadImages = async (Images) => {
    if (!validateSize()) {
      setSending(false);
      return Promise.resolve([]);
    }

    return await Promise.all(
      Images.map(async (image) => {
        const reducedImg = await handleImageCompress(image);
        const imgUrl = await uploadSingleImage(reducedImg);
        return imgUrl;
      })
    );
  };

  // upload and Fetching URLs of Uploaded Books
  const uploadBook = async () => {
    setSending(true);
    const urls = await uploadImages(Image);
    setUploadedFiles(urls);
    setSending(false);
  };

  // Checking All Books Are Unique
  const isUnique = (fileName, fileList) => {
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].name === fileName) return false;
    }
    return true;
  };

  const CopyLink = ({ link, label }) => {
    const [copied, setcopied] = useState(false);
    const CopyText = () => {
      navigator.clipboard.writeText(link);
      setcopied(true);
      setTimeout(() => {
        setcopied(false);
      }, 3000);
    };

    return (
      <Tooltip>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            cursor: "pointer",
            padding: "5px",
            borderRadius: "5px",
            border: copied ? "1px solid #2e7d32" : "1px solid rgba(0,0,0,0.2)",
            fontSize: "10px",
          }}
          onClick={CopyText}
        >
          {label}
          {copied ? (
            <CopiedIcon sx={{ fontSize: "10px" }} color="success" />
          ) : (
            <CopyIcon sx={{ fontSize: "10px" }} />
          )}
        </Stack>
      </Tooltip>
    );
  };

  const handleReset = () => {
    setImage([]);
    setSending(false);
    setUploadedFiles([]);
  };
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: "100%",
        padding: "10px",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
        <Alert severity="info" variant="outlined">
          Upload Images and get Links
        </Alert>
        {alert.show && <Alert severity={alert.type}>{alert.msg}</Alert>}
        <FilePond
          acceptedFileTypes={["image/*"]}
          name="bookImages"
          dropOnPage={true}
          dropValidation={true}
          allowReorder={true}
          allowMultiple={true}
          maxFiles={15}
          checkValidity={true}
          files={Image}
          beforeAddFile={(file) => {
            if (isUnique(file.file.name, Image)) return true;
            return false;
          }}
          onupdatefiles={(fileItems) => {
            setImage(fileItems.map((fileItem) => fileItem.file));
          }}
          labelIdle='Drag & Drop Images or <span class="filepond--label-action">Browse</span>'
          credits={false}
          styleButtonRemoveItemPosition="right"
          imagePreviewHeight={200}
        />
        <SimpleButton onClick={handleReset}>Reset</SimpleButton>
      </Stack>

      <LoadingButton
        onClick={uploadBook}
        endIcon={<UploadIcon />}
        loading={sending}
        size={15}
      >
        {sending ? "Uploading ..." : "Upload Images"}
      </LoadingButton>
      <Divider flexItem />
      {/*  ============ Uploaded Files ============  */}
      <TableContainer>
        <h4>Upload Results</h4>
        <Table sx={{ minWidth: 650 }} aria-label="Uploaded Files Table">
          <TableHead>
            <TableRow>
              <TableCell>File</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uploadedFiles.map((file) => (
              <TableRow
                key={file.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {file.name}
                </TableCell>
                <TableCell align="right">
                  {file.error ? (
                    <Chip
                      label="Failed"
                      color="error"
                      variant="outlined"
                      sx={{ width: 100 }}
                    />
                  ) : (
                    <Chip label="Success" color="success" sx={{ width: 100 }} />
                  )}
                </TableCell>
                <TableCell align="right">
                  {file.url && (
                    <CopyLink
                      link={file.url}
                      label={file.url.slice(0, Math.min(100, file.url.length))}
                    />
                  )}
                </TableCell>
                <TableCell align="right">{file.sizeinKB + " KB"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default BookshlfImageUploadUtility;
