import React, { useState, useEffect, useMemo } from "react";
import { FieldsTableService } from "./service";
import styles from "./index.module.css";

interface Field {
  name: string;
  label: string;
  type: string;
  select?: boolean;
  options?: string[];
}

interface Row {
  id: number;
  [key: string]: unknown;
}

interface FieldsTableProps {
  name: string;
  onSelectChange?: (newValue: unknown, row: Row, fieldName: string) => void;
}

const FieldsTable = ({ name, onSelectChange }: FieldsTableProps) => {
  const service = useMemo(() => new FieldsTableService(name), [name]);
  const [fields, setFields] = useState<Field[]>([]);
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fieldsData = await service.getFields();
      setFields(fieldsData);

      const rowsData = await service.getRows();
      setRows(rowsData);
    };

    fetchData();
  }, [service]);

  const handleDeleteRow = async (id: number) => {
    await service.deleteRow(id);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSelectChange = (
    field: Field,
    row: Row,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (onSelectChange) {
      onSelectChange(value, row, field.name);
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th className={styles.th} key={index}>
              {field.name}
            </th>
          ))}
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className={styles.tr} key={row.id}>
            {fields.map((field) =>
              field.select ? (
                <td className={styles.td} key={field.name}>
                  <select
                    value={String(row[field.name])}
                    onChange={(e) => handleSelectChange(field, row, e)}
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              ) : field.type === "date" ? (
                <td className={styles.td} key={field.name}>
                  {new Date(row[field.name] as string).toLocaleDateString()}
                </td>
              ) : field.type === "object" ? (
                <td className={styles.td} key={field.name}>
                  {String((row[field.name] as { name?: string })?.name ?? "")}
                </td>
              ) : (
                <td className={styles.td} key={field.name}>
                  {String(row[field.name])}
                </td>
              )
            )}
            <td className={styles.td}>
              <button
                className={styles.button}
                onClick={() => handleDeleteRow(row.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FieldsTable;
