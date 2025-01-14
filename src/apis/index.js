import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
let token = "";
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export const debounce = function debounce(fn, delay = 700) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
export const registerApi = async (data) =>
  await axios.post("/auth/register", data);

export const loginApi = async (data) => await axios.post("/auth/login", data);

export const getAllCategoriesApi = async () =>
  await axios.get("/global/categories");

export const addSuggestedProductsApi = async (product_id, type) => {
  const formdata = new FormData();
  formdata.append("product_id", product_id);
  formdata.append("interaction_type", type);
  return await axios.post("/suggested-products", formdata);
};

export const getSuggestedProductsApi = async () =>
  await axios.get("/suggested-products");
export const guestSuggestedProductsApi = async () => {
  try {
    const url = token ? "/suggested-products" : "/suggested-products-for-guest";
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }
};
export const trendingProductsApi = async () =>
  await axios.get("/trending-products");

export const addRecenetViewedApi = async (product_id) => {
  const formdata = new FormData();
  formdata.append("product_id", product_id);
  return await axios.post("/recently-viewed", formdata);
};

export const getRecentProductsApi = async () =>
  await axios.get("/recently-viewed");

export const guestRecentProductsApi = async () => {
  try {
    let formdata = new FormData();
    if (typeof window !== "undefined") {
      const ids = localStorage.getItem("productIds")
        ? JSON.parse(localStorage.getItem("productIds"))
        : [];
      if (!ids.length) return;
      formdata.append("product_ids", ids);
    }
    const url = token ? "/recently-viewed" : "/recently-viewed-by-guest";
    return await axios.post(url, formdata);
  } catch (error) {
    console.log(error);
  }
};

export const getProductBySlugApi = async (slug) =>
  await axios.get("/global/products/details/" + slug);

export const searchProductApi = async (keyword) =>
  await axios.get("/global/search-results?keywords=" + keyword);

export const debouncedSearchProductApi = debounce(searchProductApi, 700);
export const getPopularSearchApi = async () =>
  await axios.get("/global/popular-searches");
export const favoriteProductApi = async (data) =>
  await axios.post("/favorite-product", data);

export const getAllFavoriteProductApi = async () =>
  await axios.get("/favorite-products");
// /global/products/details/:id
export const createCreditLimitApi = async (data) =>
  await axios.post("/credit-limit-request", data);

export const getProfileApi = async () => await axios.get("/profile");

export const editProfileApi = async (data) =>
  await axios.put("/profile/edit", data);

export const editPasswordApi = async (data) =>
  await axios.post("/profile/change-password", data);

export const createAddressApi = async (data) =>
  await axios.post("/addresses", data);

export const getAddressApi = async () => await axios.get("/addresses");
export const getAddressByIdApi = async (id) =>
  await axios.get("/addresses/" + id);

export const editAddressApi = async (formdata, id) =>
  await axios.put("/addresses/" + id, formdata);
export const setPrimaryAddressApi = async (id) =>
  await axios.put(`/addresses/${id}/setPrimary`);

export const deleteAddressApi = async (id) =>
  await axios.delete("/addresses/" + id);

export const placeOrderApi = async (data) =>
  await axios.post("/buyer/orders", data);

export const getOrderByStatusApi = async (status) =>
  await axios.get(`/buyer/orders?status=${status}`);

// ==============================irfan================================
export const getAllProductsApi = async () =>
  await axios.get(`/global/products`);

export const getBrandProductsApi = async (id) =>
  await axios.get(`/global/products?brandId=${id}`);

export const getAllBrandsApi = async () => await axios.get(`/global/brands`);

export const getBuyerOrdersApi = async () => await axios.get(`/buyer/orders`);

export const addReviewApi = async (data) => await axios.post(`/reviews`, data);
export const getOfferProductsApi = async (data) =>
  await axios.get(`/global/product-offers`);

export const getFilterProductsApi = async (data, query) =>
  await axios.get(`/global/search-results${query}`);

export const getBrandDetails = async (id) =>
  await axios.get(`/global/store/${id}/products`);

export const getOrderTrackingApi = async (id) =>
  await axios.get(`/buyer/orders/${id}/track-status`);

export const cancelOrderApi = async (id) =>
  await axios.get(`/buyer/orders/${id}/cancel`, { params: { id: id } });

export const createReferralApi = async (data) =>
  await axios.post("/create-referral", data);

export const getCurrentUserRefsApi = async (id) =>
  await axios.get("referrals/" + id);

export const joinedReferralApi = async (data) =>
  await axios.post("/joined-referral", data);

export const contactSupportApi = async (data) =>
  await axios.post("/global/customer-support", data);

export const payWithPaypalApi = async (data) =>
  await axios.post("/payment/ccavenue-billing-page", data);

export const ccavResponseApi = async (data) => {
  return await axios.post("/payment/ccav-response-handler", data);
};

export const ccavCheckoutApi = async (data) =>
  await axios.post("/payment/ccavenue-custom-checkout", data);

export const getFirstTrendingCategoryApi = async () =>
  await axios.get(`/trending-products-by-first-category`);

export const getSecondTrendingCategoryApi = async () =>
  await axios.get(`/trending-products-by-second-category`);

export const getBannersApi = async (id) =>
  await axios.get(`/global/banners/${id}`);
