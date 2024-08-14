import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const { container, totalNum, pumpAnimate, iconWrapper } = styles;

type THeaderCounterProps = {
  to: string;
  title: string;
  totalQuantity: number;
  svgIcon: React.ReactNode;
};

const HeaderCounter = ({
  to,
  title,
  totalQuantity,
  svgIcon,
}: THeaderCounterProps) => {
  const navigate = useNavigate();
  const [debounce, setDebounce] = useState(false);
  const quantityStyle = `${totalNum} ${debounce ? pumpAnimate : ""}`;
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setDebounce(true);
    const debounce = setTimeout(() => {
      setDebounce(false);
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [totalQuantity]);
  return (
    <div className={container} onClick={() => navigate(`${to}`)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
