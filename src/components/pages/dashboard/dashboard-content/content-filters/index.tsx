import {
  FC,
  useRef,
  Dispatch,
  useState,
  FormEvent,
  SetStateAction,
} from "react";
import { FaFilter } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaRegListAlt } from "react-icons/fa";
import { Switch } from "@/store-client/src/components/common/switch";
import "./styles.scss";

type ContentFiltersProps = {
  isCardView: boolean;
  setCardView: Dispatch<SetStateAction<boolean>>;
  setOvnerId: Dispatch<React.SetStateAction<boolean>>;
  debouncedChange: (inputValue: string | null) => void;
};

export const ContentFilters: FC<ContentFiltersProps> = ({
  isCardView,
  setCardView,
  setOvnerId,
  debouncedChange,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleSubmitFilters = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;

    const onlyCreator = (
      form.elements.namedItem("onlyCreator") as HTMLInputElement
    ).checked;

    setOvnerId(onlyCreator);
  };

  const handleResetForm = () => {
    setFilterOpen(false);
    debouncedChange(null);
    formRef?.current?.reset();
  };

  return (
    <div className="app-content-actions">
      <input
        className="search-bar"
        placeholder="Search..."
        type="search"
        onChange={(ev) => debouncedChange(ev.target.value)}
      />
      <div className="app-content-actions-wrapper">
        <div className="filter-button-wrapper">
          <button
            className="action-button filter jsFilter"
            onClick={() => setFilterOpen(!isFilterOpen)}
          >
            <span>Filter</span>
            <FaFilter />
          </button>
          <div className={`filter-menu ${isFilterOpen ? "active" : ""}`}>
            <form ref={formRef} onSubmit={handleSubmitFilters}>
              <label>Products</label>
              <Switch />
              <div className="filter-menu-buttons">
                <button
                  className="filter-button reset"
                  onClick={handleResetForm}
                >
                  Reset
                </button>
                <button className="filter-button apply" type="submit">
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
        <button
          className={`action-button list ${!isCardView ? "active" : ""}`}
          title="List View"
          onClick={() => setCardView(false)}
        >
          <FaRegListAlt />
        </button>
        <button
          className={`action-button grid ${isCardView ? "active" : ""}`}
          title="Grid View"
          onClick={() => setCardView(true)}
        >
          <RxDashboard />
        </button>
      </div>
    </div>
  );
};
