import { Checkbox, ConfigProvider, Table } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBanner } from "../../api/usermain/mainbannerApi";
import {
  MainTitle,
  MiddleButton,
  MiddleInput,
  SearchButton,
  SelectStyle,
  SmallButton,
  SubTitle
} from "../../styles/AdminBasic";
import { API_SERVER_HOST } from "../../util/util";
// 테이블 스타일 관리

// 배너
export interface BannerData {
  ibanner: number;
  target: number;
  status: number; // 노출여부
  bannerUrl: string;
  bannerPic: string;
  bannerNew: number;
}

const CenteredHeaderTable = styled(Table)`
  &&& {
    .ant-table-thead > tr > th {
      text-align: center;
    }
    .ant-table-tbody > tr > td {
      text-align: center;
    }
  }
`;
const MainBanner: React.FC = () => {
  const [bannerInfo, setBannerInfo] = useState<BannerData[] | null>(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // 파일을 선택할 때마다 콘솔에 선택된 파일 정보를 출력합니다.
    console.log("선택된 파일:", file);
  };

  const fetchData = async () => {
    try {
      await getBanner(successFn, failFn, errorFn);
    } catch (error) {}
  };

  const successFn = (data: BannerData[]) => {
    const arr = data.map(item => {
      item.bannerNew = 0;
      return item;
    });
    setBannerInfo(arr);
  };
  const failFn = (error: string) => {
    console.error("목록 호출 오류:", error);
  };
  const errorFn = (error: string) => {
    console.error("목록 호출 서버 에러:", error);
  };

  useEffect(() => {
    fetchData();
    // console.log("잘 나오고 있나요 ?", bannerInfo);
  }, []);

  const dataSource = bannerInfo
    ? bannerInfo.map(item => ({
        key: item.ibanner,
        ibanner: item.ibanner,
        target: item.target,
        status: item.status,
        bannerUrl: item.bannerUrl,
        bannerPic: `${API_SERVER_HOST}/pic/banner/${item.ibanner}/${item.bannerPic}`,
        bannerNew: item.bannerNew,
      }))
    : [];

  // 배너추가버튼!
  const handleAdd = () => {
    let newIbanner;
    if (bannerInfo && bannerInfo.length > 0) {
      newIbanner = bannerInfo.length + 1;
    } else {
      newIbanner = 1; // 만약 bannerInfo가 null이거나 길이가 0이면 1로 설정
    }
    const newData: BannerData = {
      ibanner: newIbanner,
      target: 0,
      status: 0, // 노출여부
      bannerUrl: "",
      bannerPic: "",
      bannerNew: 1, // 새로운 이미지
    };
    // bannerInfo가 null인 경우 빈 배열로 초기화
    const newBannerInfo = bannerInfo || [];

    setBannerInfo([...newBannerInfo, newData]);
  };

  //  =================배너 값 관리 함수 =================

  const handleCheckChange = (ibanner: number, isChecked: boolean) => {
    console.log(`ibanner: ${ibanner}, 변경된 체크 여부: ${isChecked}`);
    // 변경된 체크 여부에 따라 원하는 작업 수행
  };

  const handleInputChange = (value: string) => {
    // 입력값을 사용하여 원하는 작업을 수행합니다.
    console.log("입력값:", value);
    // 여기에 원하는 작업 추가
  };

  const handleTargetChange = (value: number, ibanner: number) => {
    console.log("ibanner : ", ibanner, "타겟 :", value);
  };

  // 상태관리 버튼
  const handleState = (action: string, ibanner: number) => {
    if (action === "editbanner") {
      // 수정 버튼이 클릭된 경우

      console.log("수정 버튼", "ibanner:", ibanner);
    } else if (action === "deletebanner") {
      // 삭제 버튼이 클릭된 경우

      console.log("삭제 버튼", "ibanner:", ibanner);
    } else if (action === "uploadbanner") {
      // 업로드 버튼이 클릭된 경우
      console.log("업로드 버튼", "ibanner: ", ibanner);
    }
  };

  //  =================배너 값 관리 함수 =================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dataIndex: string,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newBannerPic = e.target?.result as string;
        // 선택한 파일의 Data URL을 가져왔으니, 이미지 태그에 설정해줍니다.
        const imageElement = 1
        // bannerInfo ? document.getElementById(`input-file-before-${bannerInfo.ibanner}`) as HTMLImageElement : null;
        if (imageElement) {
          // imageElement.src = newBannerPic;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const columns: any = [
    {
      title: "노출",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: any) => (
        <div>
          {/* status가 0일때 true 아니면 false를 ...? */}
          <Checkbox
            defaultChecked={status === 0 ? true : false}
            onChange={e => handleCheckChange(record.ibanner, e.target.checked)}
          />
        </div>
      ),
    },
    {
      title: "순서",
      dataIndex: "ibanner",
      key: "ibanner",
    },
    {
      title: "미리보기",
      dataIndex: "bannerPic",
      key: "bannerPic",
      render: (bannerPic: string,ibanner: any): any => (
        <img
          style={{ width: "190px", height: "66px", objectFit: "cover" }}
          src={bannerPic}
          alt=""
          id={`input-file-before-${ibanner}`}
          className="diaryadd-img-before"
        />
      ),
    },
    {
      title: "사진업로드",
      dataIndex: "ibanner",
      key: "ibanner",
      render: (ibanner: any) => (
        <>
          <label htmlFor={`input-file-before-${ibanner}`}>
            <SmallButton
              style={{ width: "100px", height: "30px" }}
              type="button"
              onClick={() => {
                const inputFile = document.getElementById(
                  `input-file-before-${ibanner}`,
                ) as HTMLInputElement;
                if (inputFile) {
                  inputFile.click();
                }
              }}
              className="diaryadd-img-input-button-before"
            >
              파일 선택
            </SmallButton>
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id={`input-file-before-${ibanner}`}
            style={{ display: "none" }}
            onChange={event => handleFileChange(event, "bannerPic")}
          />
        </>
      ),
    },
    {
      title: "링크주소",
      dataIndex: "bannerUrl",
      key: "bannerUrl",
      render: (bannerUrl: string, record: any) => (
        <>
          <MiddleInput
            defaultValue={bannerUrl}
            onChange={e => handleInputChange(e.target.value)}
          />
        </>
      ),
    },
    {
      title: "TARGET",
      dataIndex: "target",
      key: "target",
      render: (target: number, record: any) => (
        <>
          <SelectStyle
            defaultValue={target}
            onChange={e =>
              handleTargetChange(parseInt(e.target.value), record.ibanner)
            }
          >
            <option value={0}>현재창</option>
            <option value={1}>새창</option>
          </SelectStyle>
        </>
      ),
    },
    {
      title: "상태관리",
      dataIndex: "ibanner",
      key: "ibanner",
      render: (ibanner: number, record: any) => (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <>
            {record.bannerNew === 1 ? (
              <SearchButton
                onClick={() => handleState("uploadbanner", record.ibanner)}
              >
                업로드
              </SearchButton>
            ) : (
              <>
                <SearchButton
                  onClick={() => handleState("editbanner", record.ibanner)}
                >
                  수정
                </SearchButton>
                <SearchButton
                  onClick={() => handleState("deletebanner", record.ibanner)}
                  style={{ background: "#f44336" }}
                >
                  삭제
                </SearchButton>
              </>
            )}
          </>
        </div>
      ),
    },
  ];

  return (
    <>
      <MainTitle>메인 배너</MainTitle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SubTitle style={{ textAlign: "center", lineHeight: "15px" }}>
          전체 : <span style={{ color: "rgb(244, 67, 54)" }}>4</span> 건 조회 |
          순서는 숫자가 작을수록 우선 순위로 노출됩니다.
          {/* <fetching /> */}
        </SubTitle>
        <MiddleButton
          style={{ marginBottom: 16, fontSize: "12px" }}
          onClick={handleAdd}
        >
          배너 추가
        </MiddleButton>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#A5A5A5",
          },
          components: {
            Table: {
              headerBg: "#535353",
              headerColor: "#fff",
            },
          },
        }}
      >
        <CenteredHeaderTable
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
        />
      </ConfigProvider>
    </>
  );
};
export default MainBanner;
