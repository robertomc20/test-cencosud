import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PageviewIcon from "@mui/icons-material/Pageview";
import { IStoredData } from "../types/StoredData";
import AppContext from "../context/AppContext";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";

export const Detail = () => {
  const myContext = useContext(AppContext);
  const [rows, setRows]: any[] = useState([]);
  const [detailForm, setDetailForm]: any = useState([]);
  const [detailFormSelected, setDetailFormSelected]: any = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Columnas del datagrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "form",
      headerName: "Formulario Ingresado",
      width: 150,
      editable: true,
    },
    {
      field: "date",
      headerName: "Fecha de ingreso",
      width: 150,
      editable: true,
    },
    {
      field: "showDetails",
      headerName: "Ver detalle",
      width: 110,
      renderCell: (params) => {
        return (
          <Button onClick={() => getDetailByFormId(params.row.id)}>
            <PageviewIcon color="primary" fontSize="large" />
          </Button>
        );
      },
    },
  ];

  // Funcion para traer data y setear variables de detalles y que se mostrara en tabla
  const getData = () => {
    if (localStorage.getItem("storedForms")) {
      setLoadingData(true);

      const storedData: [] = JSON.parse(
        localStorage.getItem("storedForms") || ""
      );

      // Se homologa el nombre de los formularios
      const homologateFormName = (formName: string) => {
        switch (formName) {
          case "form1":
            return "Formulario 1";

          case "form2":
            return "Formulario 2";

          case "form3":
            return "Formulario 3";

          case "allforms":
            return "Todos los formularios";
        }
      };
      // Se setea data para mostrar en la tabla
      const dataToShow = storedData.map((item, index: number) => {
        const dateFormatted: string = item["entryDate"];
        const formFormatted: string =
          homologateFormName(item["entryForm"]) || "";

        const dataToSave: any = {
          id: index,
          form: formFormatted,
          date: dateFormatted,
        };
        return dataToSave;
      });

      setRows(dataToShow);

      // Se setea data para mostrar en detalles del formulario ingresado
      const dataToDetail = storedData.map((item, index: number) => {
        const formFormatted: string =
          homologateFormName(item["entryForm"]) || "";

        const itemToObject: object = item;

        const dataDetailForm: any = {
          ...itemToObject,
          entryForm: formFormatted,
          id: index,
        };

        return dataDetailForm;
      });
      setDetailForm(dataToDetail);

      setLoadingData(false);
    }
    return;
  };

  // Se ejecuta funcion que trae la data del local storage y pobla el datagrid
  useEffect(() => {
    getData();
  }, [myContext.uploadForm]);

  const getDetailByFormId = (id: number) => {
    const detailsSelected = detailForm.filter(
      (item: any, index: number) => item.id === id
    );
    setDetailFormSelected(detailsSelected[0]);
    console.log(detailsSelected);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div className="detail">
      <DataGrid
        className="detail__datagrid"
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          id: false,
        }}
        getRowId={(row) => row.id}
        hideFooter
        isCellEditable={() => false}
        loading={loadingData}
      />

      <Dialog
        className="detail__contentContainer"
        onClose={handleCloseModal}
        open={openModal}
      >
        <h1 className="detail__contentTitle">
          Detalles del formulario ingresado
        </h1>

        <div className="detail__contentModal">
          {detailFormSelected?.entryForm === "Formulario 1" ||
          detailFormSelected?.entryForm === "Todos los formularios" ? (
            <>
              <div className="detail__contentFields">
                <h2>Corte de cabello</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.select1}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Peluquero</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.select2}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Comentario adicional</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.comment}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </>
          ) : null}

          {detailFormSelected?.entryForm === "Formulario 2" ||
          detailFormSelected?.entryForm === "Todos los formularios" ? (
            <>
              <div className="detail__contentFields">
                <h2>Motivo de la solicitud</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.reason}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Detalle</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.details}
                  inputProps={{ readOnly: true }}
                  rows={4}
                  multiline={true}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Fecha del evento</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.eventDate}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </>
          ) : null}

          {detailFormSelected?.entryForm === "Formulario 3" ||
          detailFormSelected?.entryForm === "Todos los formularios" ? (
            <>
              <div className="detail__contentFields">
                <h2>Fecha Desde</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.fromDate}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Fecha Hasta</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.untilDate}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <div className="detail__contentFields">
                <h2>Archivo subido</h2>
                <TextField
                  size="small"
                  value={detailFormSelected?.file}
                  inputProps={{ readOnly: true }}
                />
              </div>
            </>
          ) : null}
        </div>
      </Dialog>
    </div>
  );
};
