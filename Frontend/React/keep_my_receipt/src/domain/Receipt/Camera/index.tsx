import React, { useState } from 'react';
import { Stack, Container, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateImage from './image';
import CreateForm from './form';

interface formProps {
  type: string;
  imgFile?: any;
}

export default function ReceiptCreate() {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:500px)');

  const [check, setCheck] = useState(false);
  // form
  const [form, setForm] = useState<formProps>({
    type: '',
    imgFile: '',
  });
  const { type, imgFile } = form;
  const onFormChange = (e: any) => {
    const { name, value } = e.target;
    console.log(type, value);
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onImgChange = (file: any) => {
    setForm({
      ...form,
      imgFile: file,
    });
  };

  const createReceipt = async () => {
    if (form.type === '') {
      setCheck(true);
      alert('영수증 종류를 선택해주세요');
      return;
    } else {
      setCheck(false);
    }
    console.log(form);

    // OCR 연결
    //navigate('..');
  };

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        spacing={3}
        style={
          matches
            ? { marginTop: 50, marginBottom: 30, width: '100%' }
            : { marginTop: 50, marginBottom: 100, width: '100%' }
        }
      >
        <br></br>
        {/* 본문 */}
        <Stack spacing={3}>
          {/* 이미지 */}
          <CreateImage onImgChange={onImgChange} />

          {/* Form */}
          <CreateForm
            type={type}
            check={check}
            onChange={onFormChange}
            onClick={createReceipt}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
