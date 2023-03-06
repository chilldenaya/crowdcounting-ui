import {
  Form,
  Upload,
  Button,
  Card,
  TimePicker,
  DatePicker,
  Select,
  Image,
  Col,
  Row,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'

export default function Home() {
  const timeFormat = 'HH:mm'
  const [imageUrl, setImageUrl] = useState<string>('')

  // const handleUpload = () => {
  //   const formData = new FormData()
  //   fileList.forEach(file => {
  //     formData.append('files[]', file as RcFile)
  //   })
  //   setUploading(true)
  //   // You can use any AJAX library you like
  //   fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
  //     body: formData,
  //     method: 'POST',
  //   })
  //     .then(res => res.json())
  //     .then(() => {
  //       setFileList([])
  //       message.success('upload successfully.')
  //     })
  //     .catch(() => {
  //       message.error('upload failed.')
  //     })
  //     .finally(() => {
  //       setUploading(false)
  //     })
  // }

  return (
    <>
      <Row>
        <Col span={12}>
          <Card style={{ width: '100%' }}>
            <Form
              style={{ maxWidth: 600 }}
              labelCol={{ span: 4 }}
              layout="horizontal"
              onFinish={(values: any) => {
                const formData = new FormData()
                formData.append('file', values.file.fileList[0].originFileObj)

                fetch('http://localhost:8000/upload', {
                  body: formData,
                  method: 'POST',
                })
                  .then(response => {
                    response.blob().then(blob => {
                      const url = URL.createObjectURL(blob)
                      setImageUrl(url)
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })
              }}
            >
              <Form.Item name="file" label="File">
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item name="gate" label="Titik">
                <Select>
                  <Select.Option value="gate1">Gate 1</Select.Option>
                  <Select.Option value="gate2">Gate 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="date" label="Tanggal">
                <DatePicker />
              </Form.Item>
              <Form.Item name="time" label="Waktu">
                <TimePicker format={timeFormat} />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100%' }}>
            <h1>Result</h1>
            <Image width={434} src={imageUrl} />
          </Card>
        </Col>
      </Row>
    </>
  )
}
