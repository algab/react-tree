import React from "react";
import { SettingOutlined } from "@ant-design/icons";

import "./styles.scss";

type Props = {
  title: string;
  status?: string;
  search: string;
};

const TreeTitle: React.FC<Props> = ({ title, status, search }) => {
  const index = title.toLocaleUpperCase().indexOf(search.toLocaleUpperCase() || "");
     
  return (
    <div className="tree-title">
      <div>
        {index > -1 ? (
          <span>
            {title.substr(0, index)}
              <span className="tree-title-search">{title.substr(index, search.length)}</span>
            {title.substr(index + search.length)}
         </span>
        ) : <span>{title}</span>}
        {status !== undefined && <p>{status}</p>}
      </div>
      <div className="tree-title-icon">
        <SettingOutlined onClick={() => alert(title)} />
      </div>
    </div>
  );
};

export default TreeTitle;
