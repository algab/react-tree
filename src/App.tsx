import React, { useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import Tree, { TreeNode, TreeNodeProps } from "rc-tree";
import { Key } from "rc-tree/lib/interface";

import TreeTitle from "./components/Title";
import {
  mapCategory,
  searchCategory,
  filter,
  filterChildren,
} from "./utils/tree";

import Radio from "./assets/img/radios.png";
import RadioCheck from "./assets/img/radios-check.png";
import data from "./assets/data/taxonomy.json";

import "./App.scss";
import "./tree.scss";

const App: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [taxonomy, setTaxonomy] = useState<any[]>(data);
  const [search, setSearch] = useState<string>("");
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);

  const onExpand = (keys: Key[]) => {
    setKeys(keys as string[]);
    setExpand(false);
  };

  const switcherIcon = (props: TreeNodeProps) => {
    if (props.isLeaf) {
      return <></>;
    }
    return !props.expanded ? (
      <RightOutlined className="icon" />
    ) : (
      <DownOutlined className="icon-expanded" />
    );
  };

  const icon = (key: string, select: boolean) => {
    if (select) {
      return (
        <img
          src={RadioCheck}
          onClick={() => selectCategory(key, false)}
          className="img-radio"
          alt="check"
        />
      );
    } else {
      return (
        <img
          src={Radio}
          onClick={() => selectCategory(key, true)}
          className="img-radio"
          alt="uncheck"
        />
      );
    }
  };

  const selectCategory = (key: string, select: boolean) => {
    mapCategory(taxonomy, key, select);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (event.target.value === "") {
        setKeys([]);
        setSearch("");
        setExpand(false);
        setTaxonomy(data);
      } else {
        setKeys([]);
        setTaxonomy(data);
        setSearch(event.target.value);
        const keysSearch = searchCategory(data, event.target.value, []);
        setKeys(keysSearch);
        const mapCategory = filter(data, keysSearch);
        const filterCategory = filterChildren(mapCategory, keysSearch);
        setTaxonomy(filterCategory);
        setExpand(true);
      }
    }, 250);
  };

  const children = (categories: any) => {
    if (categories.children !== undefined) {
      return (
        <TreeNode
          key={categories.key}
          icon={() => icon(categories.key, categories.select)}
          title={() => (
            <TreeTitle
              title={categories.title}
              status={categories.status}
              search={search}
            />
          )}
          disabled={categories.status === "Inativo"}
        >
          {categories.children.map((cat: any) => children(cat))}
        </TreeNode>
      );
    } else {
      return (
        <TreeNode
          key={categories.key}
          icon={() => icon(categories.key, categories.select)}
          title={() => (
            <TreeTitle
              title={categories.title}
              status={categories.status}
              search={search}
            />
          )}
          disabled={categories.status === "Inativo"}
        />
      );
    }
  };

  return (
    <div className="container">
      <div className="fields">
        <div className="search">
          <input
            type="text"
            placeholder="Digite o nome de uma categoria"
            className="input-search"
            onChange={handleSearch}
          />
        </div>
        <div>
          <p>Ativar Checkbox</p>
          <label className="switch">
            <input type="checkbox" onChange={() => setShowIcon(!showIcon)} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="tree">
        <Tree
          showIcon={showIcon}
          selectable={true}
          checkable={false}
          switcherIcon={switcherIcon}
          onExpand={onExpand}
          expandedKeys={keys}
          autoExpandParent={expand}
        >
          {taxonomy.map((cat: any) => children(cat))}
        </Tree>
      </div>
    </div>
  );
};

export default App;
