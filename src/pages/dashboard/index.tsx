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
  Modal,
  message,
  Spin,
  Space,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { useState } from 'react'
import moment from 'moment'
import dayjs from 'dayjs'
import { RcFile } from 'antd/es/upload'
import 'dayjs/locale/id'

export default function Home() {
  const timeFormat = 'HH:mm'
  const [imageUrl, setImageUrl] = useState<string>('')
  const [fileImage, setFileImage] = useState<any>([])

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [prevResult, setPrevResult] = useState(false)

  dayjs.locale('id')

  const now = dayjs()

  const handleUpload = async (event: any) => {
    setFileImage(event.fileList)
  }

  const handleUploadRemove = async () => {
    setFileImage([])
  }

  const handlePreview = async (file: any) => {
    file.preview = await getBase64(file.originFileObj)
    setPreviewVisible(true)
    setPreviewImage(file.preview)
    // window.open(file.preview)
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }
  const handleCancel = () => setPreviewVisible(false)

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE
  }

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
                console.log('images ', fileImage)
                formData.append('file', fileImage[0].originFileObj)

                fetch('http://localhost:8000/upload', {
                  body: formData,
                  method: 'POST',
                })
                  .then(response => {
                    response.blob().then(blob => {
                      const url = URL.createObjectURL(blob)
                      setImageUrl(url)
                      setLoading(false)
                      setPrevResult(true)
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })
              }}
            >
              <Form.Item name="file" label="File">
                <Upload
                  onChange={handleUpload}
                  onPreview={handlePreview}
                  onRemove={handleUploadRemove}
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={beforeUpload}
                >
                  {fileImage.length == 1 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                *only support JPG/PNG file with size less than 2M
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="preview"
                    style={{ width: '100%' }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
<<<<<<< Updated upstream
              <Form.Item name="gate" label="Titik">
                <Select
                  labelInValue
                  defaultValue={{ value: 'gate1', label: 'Gate 1' }}
                >
                  <Select.Option value="gate1">Gate 1</Select.Option>
                  <Select.Option value="gate2">Gate 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="date" label="Tanggal">
                <DatePicker defaultValue={now} />
              </Form.Item>
              <Form.Item name="time" label="Waktu">
                <TimePicker
                  format={timeFormat}
                  defaultValue={dayjs(now, 'HH:mm')}
                />
=======
              <Form.Item
                name="gate"
                label="Titik"
                initialValue={{ label: 'Gate 1', value: 'Gate 1' }}
              >
                <Select labelInValue>
                  <Select.Option value="Gate 1">Gate 1</Select.Option>
                  <Select.Option value="Gate 2">Gate 2</Select.Option>
                  <Select.Option value="Gate 3">Gate 3</Select.Option>
                  <Select.Option value="Gate 4">Gate 4</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="datetime" label="Tanggal" initialValue={now}>
                <DatePicker showTime />
>>>>>>> Stashed changes
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    setLoading(true)
                    setImageUrl('')
                  }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: '100%' }}>
            <h1>Result</h1>
            <Row justify="center">
              <Spin tip="Loading..." spinning={loading}></Spin>
            </Row>
            <Row justify="center">
              <Image width={434} src={imageUrl} preview={prevResult} />
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
}
