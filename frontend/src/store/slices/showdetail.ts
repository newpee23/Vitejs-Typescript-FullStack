import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { custommer_type, detailCustomer } from "../../type";

type stateinitial_type = {
  customer: detailCustomer[] | null;
  editcustomer: detailCustomer[] | null
  loading: boolean;
  error: string;
};

const initialState: stateinitial_type = {
  customer: null,
  editcustomer: null,
  loading: false,
  error: "",
};

// สร้างตัวแปรเพื่อใช้ในการยกเลิก
const source = axios.CancelToken.source();

// สร้างฟังก์ชัน loadAsync_showDetail แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_showDetail = createAsyncThunk(
  "showDetail/loadAsync",
  async () => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get("http://localhost:4040/showDetail", {
        cancelToken: source.token,
      });
      // console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน loadAsync_CustomerEdit แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_CustomerEdit = createAsyncThunk(
  "customerEdit/loadAsync",
  async (id: number) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get(`http://localhost:4040/customer/edit/${id}`, {
        cancelToken: source.token,
      });
      // console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน deleteItem แบบ asynchronous ด้วย createAsyncThunk
export const deleteItem = createAsyncThunk(
  "deleteItem/loadAsync",
  async (id: number) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      await axios.delete(`http://localhost:4040/deleteItem/${id}`, {
        cancelToken: source.token,
      });
      return id; // ส่ง ID กลับเพื่อให้สามารถดำเนินการลบข้อมูลในส่วนของ state ได้
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน updateItem แบบ asynchronous ด้วย createAsyncThunk
export const updateItem = createAsyncThunk(
  "updateItem/loadAsync", // แก้ไขชื่อ action type
  async ({ id, data }: { id: number, data: custommer_type }) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.put(`http://localhost:4040/updateItem/${id}`, data); // แก้ไขให้ใช้ PUT request

      return response.data; 
    } catch (error) {
      throw error;
    }
  }
);

const showDetailSlice = createSlice({
  name: "showDetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loadAsync_showDetail
    builder.addCase(loadAsync_showDetail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loadAsync_showDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_showDetail.rejected, (state, action) => {
      state.customer = null;
      state.loading = false;
      state.error = action.error.message || "";
    });
    // loadAsync_CustomerEdit
    builder.addCase(loadAsync_CustomerEdit.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loadAsync_CustomerEdit.fulfilled ,(state, action) => {
      state.loading = false;
      state.editcustomer = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_CustomerEdit.rejected ,(state, action) => {
      state.loading = false;
      state.editcustomer = null;
      state.error = action.error.message || "";
    });
    //updateItem
    builder.addCase(updateItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    //deleteItem
    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      if (state.customer) {
        state.customer = state.customer.filter(
          (item) => item.id !== action.payload
        );
      }
    });
    builder.addCase(deleteItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default showDetailSlice.reducer;
