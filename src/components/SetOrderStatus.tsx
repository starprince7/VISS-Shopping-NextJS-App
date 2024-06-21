import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalAtmIcon from "@mui/icons-material/LocalAtm"; /* For refunded Icon */
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn"; /* For returned Icon */

import apiClient from "../config/apiConfig";
import toastService from "../services/toast-notification";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1.2,
  boxShadow: 24,
};

type Props = {
  orderId: string;
  orderNo: string;
  customerName: string;
  handleClose?: () => void;
};

export const SetOrderStatus = ({
  orderId,
  orderNo,
  customerName,
  handleClose = () => { },
}: Props) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOrderStatusUpdate = async () => {
    if (!orderStatus) {
      toastService.showInfoMessage("Select an order status!");
      return;
    }

    const payload = {
      status: orderStatus,
      orderId,
    };

    setLoading(true);
    setIsButtonDisabled(true);

    try {
      const res = await apiClient.post(
        "/api/admin/orders/update_status",
        payload,
      );
      console.log("Res:", res);
      if (res.data.error) {
        toastService.showErrorMessage(res.data.error);
        setLoading(true);
        setIsButtonDisabled(true);
        return;
      }

      // success
      toastService.showSuccessMessage(res.data.message);
    } catch (e: any) {
      toastService.showErrorMessage(
        `Update failed, ${e.response.data.message || e.message}!`,
      );
      setLoading(false);
      setIsButtonDisabled(false);
    } finally {
      setLoading(false);
      setIsButtonDisabled(false);
      setOrderStatus("");
      handleClose();
    }
  };

  return (
    <Box sx={style}>
      <Stack>
        {loading && <LinearProgress color="primary" className="mb-5" />}
        <Box sx={{ p: 3 }}>
          <Typography className="mb-2 text-xl font-bold">
            Set Order Status
          </Typography>
          <Stack className="mb-5 space-y-1">
            <Typography sx={{ fontSize: 13 }}>
              Order No: <b>{orderNo}</b>
            </Typography>
            <Typography sx={{ fontSize: 13 }}>
              Customer's Name: <b>{customerName}</b>
            </Typography>
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" className="text-sm">
              Select status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderStatus}
              label="Age"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <MenuItem value="CANCELED">
                <Typography className="text-gray-600">
                  <DisabledByDefaultIcon className="w-5 mr-3" /> CANCELED
                </Typography>
              </MenuItem>
              <MenuItem value="SHIPPED">
                <Typography className="text-gray-600">
                  <LocalShippingIcon className="w-5 mr-3" /> SHIPPED
                </Typography>
              </MenuItem>
              <MenuItem value="DELIVERED">
                <Typography className="text-gray-500">
                  <CheckBoxIcon className="w-5 mr-3" /> DELIVERED
                </Typography>
              </MenuItem>
              <MenuItem value="REFUNDED">
                <Typography className="text-gray-600">
                  <LocalAtmIcon className="w-5 mr-3" /> REFUNDED
                </Typography>
              </MenuItem>
              <MenuItem value="RETURNED">
                <Typography className="text-gray-600">
                  <AssignmentReturnIcon className="w-5 mr-3" /> RETURNED
                </Typography>
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            disabled={isButtonDisabled}
            disableElevation
            style={{ background: "#89A67E" }}
            sx={{ width: "100%", borderRadius: 2, my: 2, color: "white" }}
            onClick={handleOrderStatusUpdate}
          >
            <Typography>Update</Typography>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
