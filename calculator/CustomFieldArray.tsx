/** @jsx jsx */
/* tslint:disable */
import React from "react";

import { jsx, SerializedStyles } from "@emotion/core";

import { Typography, Input, Tag } from "antd";
import { Field, FieldProps, ErrorMessage, FormikProps } from "formik";

import { formHelperLabels as LABELS } from "./FormHelperLabels";
import { formHelperStyles } from "./FormHelperStyles";
import { StringValidPair } from "Constants";

const { Text } = Typography;

interface Props {
  name: string;

  /**
   *  Variable to define the list container name
   *  for error handeling
   */
  listName: string;

  /**
   *  function which is triggered when enter key is pressed
   *  which accepts parameter of data and is valid
   */
  onEnter?: (data: string, formHandler: FormikProps<any>) => void;

  /**
   *  by default "name" is used to indicate the field name in UI
   *  but if a custom label is to be shown this overrides "name"
   */
  label?: string;

  mandatory?: boolean;

  onTagClose: (removeTag: string, formHandler: FormikProps<any>) => void;

  disabled?: boolean;
  hideError?: boolean;

  hideListError?: boolean;

  customError?: string;
  /**
   * props.placeholder is given highest priority
   * fallback: label or name
   */
  placeholder?: string;

  /**
   * customStyles provided overrides default styles using
   * "Composition" behavior of emotion.
   * reference: https://emotion.sh/docs/composition
   */
  customStyles?: SerializedStyles;
}

/**
 *
 * @param {Props} props
 * @returns a reusable, customizable input component to be used only within context of formik.
 */
const CustomFieldArray: React.FC<Props> = (props: Props) => {
  const {
    name,
    label,
    mandatory,
    disabled,
    hideError,
    customError,
    customStyles,
    onEnter,
    onTagClose,
    listName,
    hideListError
  } = props;
  const renderFieldArray = (
    <div css={[customStyles, formHelperStyles]}>
      <Text className="label">
        {label || name}
        <Text className="mandatory">{mandatory && LABELS.mandatory}</Text>
      </Text>
      <Field name={name}>
        {({ field, meta, form }: FieldProps) => (
          <Input
            {...field}
            onPressEnter={() => {
              if (onEnter !== undefined) {
                (meta.error ? false : true) && onEnter(field.value, form);
              }
            }}
            disabled={disabled}
          />
        )}
      </Field>
      {!hideError && (
        <ErrorMessage name={name}>
          {msg => {
            const errorMessage = customError || msg; //To make sure only 1 error message is shown.
            return <Typography className="error">{errorMessage}</Typography>;
          }}
        </ErrorMessage>
      )}
      <Typography className="elementList">
      <Field name={listName}>
      {({ field:{value} }: FieldProps) => (
        value.map((item:StringValidPair, index:number) => (
          <Field key={item.value} name={listName + `.${index}`}>
            {({ form }: FieldProps) => (
              <Tag
                closable
                onClose={() => onTagClose(item.value, form)}
                color={
                  item.hasOwnProperty("isValid")
                    ? item.isValid
                      ? "green"
                      : "red"
                    : ""
                }
              >
                {item.value}
              </Tag>
            )}
          </Field>
        )))}
        </Field>
      </Typography>
      {!hideListError && (
        <ErrorMessage name={listName}>
          {msg => {
            const errorMessage = customError || msg; //To make sure only 1 error message is shown.
            return <Typography className="error">{errorMessage}</Typography>;
          }}
        </ErrorMessage>
      )}
    </div>
  );
  return renderFieldArray;
};

export default CustomFieldArray;
