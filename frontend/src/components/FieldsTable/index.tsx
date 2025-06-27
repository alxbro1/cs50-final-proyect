import React, { useState, useEffect, useMemo } from "react";
import { FieldsTableService } from "./service";
import styles from "./index.module.css";

interface Field {
  name: string;
  label: string;
  type: string;
}

interface Row {
  id: number;
  [key: string]: unknown;
}

const FieldsTable = ({ name }: { name: string }) => {
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
              field.type === "date" ? (
                <td className={styles.td} key={field.name}>
                  {new Date(row[field.name] as string).toLocaleDateString()}
                </td>
              ) : (
                <td className={styles.td} key={field.name}>
                  {String(row[field.name] ?? "")}
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
