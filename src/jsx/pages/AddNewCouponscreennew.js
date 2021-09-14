import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCouponDetails } from "../../actions/couponsActions";
import checkPermission, { checkPermissionOnSubmit } from "./checkpermission";

const AddNewCouponscreen = ({ history, match }) => {
  const [percentage, setIsPercentage] = useState({ checked: false });
  const [selectedValues, setSelectedValues] = useState([]);

  const couponId = match.params.id;

  const couponDetails = useSelector((state) => state.couponDetails);
  const { loading, error, coupon } = couponDetails;

  const couponCreate = useSelector((state) => state.couponCreate);
  const { loading: loadingcreate, error: errorcreate } = couponCreate;

  const allshops = useSelector((state) => state.allshops);
  const { loading: shoploading, shopError, shops } = allshops;

  const productList = useSelector((state) => state.productList);
  const {
    loading: productloading,
    error: producterror,
    products,
    page,
    pages,
  } = productList;

  const shopListDetails = useSelector((state) => state.shopListDetails);
  const { loading: load, error: err, shop } = shopListDetails;

  const populateOptions = () => {
    let objects = [products.length];
    for (var x = 0; x < products.length; x++) {
      objects[x] = { value: products[x].id, label: products[x].name_en };
    }
    return objects;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon) {
      if (coupon.ispercentage === true) {
        setIsPercentage({ checked: true });
      } else {
        setIsPercentage({ checked: false });
      }
    }
  }, [coupon]);

  useLayoutEffect(() => {
    checkPermission(history, "coupon.add");
    if (couponId) {
      if (checkPermissionOnSubmit("coupon.update")) {
        history.push("/error");
        return;
      }
    }
    dispatch(listCouponDetails(couponId));
  }, [dispatch, couponId]);

  return <div></div>;
};

export default AddNewCouponscreen;
