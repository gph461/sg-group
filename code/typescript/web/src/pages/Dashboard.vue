<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Flex,
  Row,
  Tooltip,
} from 'ant-design-vue';
import Card from 'src/components/Card.vue';
</script>
<template>
  <Breadcrumb style="margin: 16px 0">
    <BreadcrumbItem>Home</BreadcrumbItem>
    <BreadcrumbItem>Dashboard</BreadcrumbItem>
  </Breadcrumb>
  <div>
    <div style="margin-bottom: 15px">
      <Row :gutter="16">
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Total Accumulative Commission
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>RM 1M</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Yearly Commission Released
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>5k</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Monthly Commission Released
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>RM 800k</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Monthly Commission To Be Released
              </h3>
              <Tooltip title="Prompt Text" placement="left">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>RM 300k</p>
          </Card>
        </Col>
      </Row>
    </div>
    <div style="margin-bottom: 15px">
      <Row :gutter="16">
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Monthly Booking
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>10k</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Monthly Appointment
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>5000</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Monthly Unit Sold
              </h3>
              <Tooltip title="Prompt Text">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d"
                />
              </Tooltip>
            </Flex>
            <p>1000</p>
          </Card>
        </Col>
        <Col :span="6">
          <Card :bordered="false">
            <Flex>
              <h3 class="text-fprimary-1" style="width: 100%; min-height: 55px">
                Pending Loan
              </h3>
              <Tooltip title="Prompt Text" placement="left">
                <i
                  class="fa-regular fa-circle-question"
                  style="color: #ff9d2d; display: absolute; right: 0"
                />
              </Tooltip>
            </Flex>
            <p>500</p>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ant-flex {
  text-align: center;
}

h3 {
  margin: 0;
}

p {
  font-size: 50px;
  margin: 0;
  font-weight: 700;
}

.ant-card .ant-card-body {
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
