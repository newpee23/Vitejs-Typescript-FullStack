import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  amphures_type,
  custommer_type,
  districts_type,
  geographies_type,
  provinces_type,
} from "../../type";
import axios from "axios";

type stateinitial_type = {
  geographies: geographies_type[] | null;
  provinces: provinces_type[] | null;
  amphures: amphures_type[] | null;
  districts: districts_type[] | null;
  loading: boolean;
  error: string;
};

const initialState: stateinitial_type = {
  geographies: null,
  provinces: null,
  amphures: null,
  districts: null,
  loading: false,
  error: "",
};

// สร้างตัวแปรเพื่อใช้ในการยกเลิก
const source = axios.CancelToken.source();

// สร้างฟังก์ชัน loadAsync_Geographies แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_Geographies = createAsyncThunk(
  "geographies/loadAsync",
  async () => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get("http://localhost:4040/", {
        cancelToken: source.token,
      });
      //   console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน loadAsync_Provinces แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_Provinces = createAsyncThunk(
  "provinces/loadAsync",
  async (geography_id: number) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get(
        `http://localhost:4040/provinces/${geography_id}`,
        {
          cancelToken: source.token,
        }
      );
      // console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน loadAsync_Amphures แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_Amphures = createAsyncThunk(
  "amphures/loadAsync",
  async (provinces_id: number) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get(
        `http://localhost:4040/amphures/${provinces_id}`,
        {
          cancelToken: source.token,
        }
      );
      // console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน loadAsync_Districts แบบ asynchronous ด้วย createAsyncThunk
export const loadAsync_Districts = createAsyncThunk(
  "districts/loadAsync",
  async (districts_id: number) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.get(
        `http://localhost:4040/districts/${districts_id}`,
        {
          cancelToken: source.token,
        }
      );
      // console.log(response.data);
      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

// สร้างฟังก์ชัน addCustommer แบบ asynchronous ด้วย createAsyncThunk
export const Async_addCustommer = createAsyncThunk(
  "addCustommer/Async",
  async (data: custommer_type) => {
    // ใส่โค้ดที่ทำการส่งคำขอเข้าสู่ระบบและคืนค่าผลลัพธ์ที่ได้ในรูปแบบของ async/await
    try {
      const response = await axios.post(
        `http://localhost:4040/addCustommer/`,
        data,
        {
          cancelToken: source.token,
        }
      );

      return response.data; // ส่งข้อมูลกลับมาเพื่อให้ createAsyncThunk จัดการ
    } catch (error) {
      throw error;
    }
  }
);

const formInputSlice = createSlice({
  name: "frominput",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loadAsync_Geographies
    builder.addCase(loadAsync_Geographies.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(loadAsync_Geographies.fulfilled, (state, action) => {
      state.loading = false;
      state.geographies = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_Geographies.rejected, (state, action) => {
      state.geographies = null;
      state.loading = false;
      state.error = action.error.message || "";
    });
    // loadAsync_Provinces
    builder.addCase(loadAsync_Provinces.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(loadAsync_Provinces.fulfilled, (state, action) => {
      state.loading = true;
      state.provinces = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_Provinces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.provinces = null;
    });
    //loadAsync_Amphures
    builder.addCase(loadAsync_Amphures.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(loadAsync_Amphures.fulfilled, (state, action) => {
      state.loading = true;
      state.amphures = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_Amphures.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.amphures = null;
    });
    //loadAsync_Districts
    builder.addCase(loadAsync_Districts.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(loadAsync_Districts.fulfilled, (state, action) => {
      state.loading = true;
      state.districts = action.payload;
      state.error = "";
    });
    builder.addCase(loadAsync_Districts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
      state.districts = null;
    });
    //Async_addCustommer
    builder.addCase(Async_addCustommer.pending, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(Async_addCustommer.fulfilled, (state, action) => {
      state.loading = true;
      state.error = action.payload.message;
    });
    builder.addCase(Async_addCustommer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export default formInputSlice.reducer;
