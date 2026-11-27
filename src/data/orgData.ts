export interface DeptFunctionSection {
  level: string;
  scope: string;
  items: string[];
}

export interface DeptFunctionArea {
  id: string;
  slide: number;
  group: string;
  title: string;
  deptCode: string;
  sections: DeptFunctionSection[];
}

export interface OrgPositionItem {
  id: string;
  order: number;
  slide: number;
  deptCode: string;
  deptName: string;
  category: string;
  title: string;
  tier: number; // 1: Lãnh đạo, 2: Trưởng phòng/QĐ, 3: Trưởng nhóm/TT, 4: Chuyên viên/NV
  duties: string[];
}

export const deptFunctionAreas: DeptFunctionArea[] = [
  {
    "id": "func-7",
    "slide": 7,
    "group": "Kinh doanh",
    "title": "Kinh doanh Xe Du lịch",
    "deptCode": "KDDL",
    "sections": [
      {
        "level": "VP Công ty",
        "scope": "Kinh doanh xe theo Nhóm Thương hiệu/ Nhóm xe",
        "items": [
          "Hoạt động Kinh doanh Nhóm TH BMW; Kinh doanh Nhóm xe Stellantis tại Công ty THACO AUTO Nghệ An: Các hoạt động kinh doanh, triển khai các giải pháp kinh doanh, chính sách bán hàng, Marketing, đào tạo được điều hành trực tiếp bởi Kinh doanh Nhóm TH BMW và Kinh doanh Nhóm xe Stellantis từ VPĐH đến VP Công ty và Showroom. Đảm bảo hoàn thành chỉ tiêu doanh số và tuân thủ tiêu chuẩn hoạt động.",
          "Hoạt động Kinh doanh Nhóm xe Mainstream tại THACO AUTO Nghệ An: Công ty chịu trách nhiệm chủ động điều hành toàn diện hoạt động bán hàng tại các Showroom/Đại lý trực thuộc, gồm: Quản lý thị trường; Đặt hàng - điều phối - bán hàng và quản lý tồn kho; Điều hành chính sách bán hàng theo đặc thù từng địa bàn; Định biên, tuyển dụng và đào tạo nhân sự bán hàng; Tổ chức hoạt động Marketing bán hàng; Đảm bảo hoàn thành các chỉ tiêu Kinh doanh ,đáp ứng tiêu chuẩn, quy định và hoạt động có hiệu quả."
        ]
      },
      {
        "level": "Cấp 2",
        "scope": "Kinh doanh xe theo Nhóm Thương hiệu/ Nhóm xe",
        "items": [
          "Quản trị hoạt động kinh doanh theo nhóm thương hiệu, nhóm xe tại Công ty, Showroom/Đại lý. Có các chức năng: Kế hoạch; Sản phẩm và Marketing.",
          "Kế hoạch kinh doanh:",
          "Thông tin thị trường, phân tích và dự báo thị trường. Xây dựng và quản trị chính sách bán hàng theo thương hiệu/ theo từng địa bàn.",
          "Quản trị, kiểm soát công tác mua hàng, bán hàng và hoạt động điều phối, quản lý tồn kho xe.",
          "Quản trị thực hiện chỉ tiêu các Showroom.",
          "Sản phẩm:",
          "Phân tích định vị sản phẩm, thông tin cạnh tranh, biên soạn tài liệu về sản phẩm, bán hàng, Marketing và triển khai đào tạo.",
          "Phản hồi các thông tin về chất lượng sản phẩm, đề xuất nâng cấp phát triển sản phẩm về VPĐH.",
          "Marketing:",
          "Tham gia quản trị hoạt động Marketing bán hàng theo vùng thị trường.",
          "Tham gia hoạt động chăm sóc khách hàng lớn, khách hàng doanh nghiệp.",
          "Định hướng, triển khai và kiểm soát các hoạt động chăm sóc khách hàng."
        ]
      },
      {
        "level": "Cấp 2",
        "scope": "Kinh doanh xe theo Thương hiệu",
        "items": [
          "Kinh doanh xe theo thương hiệu có chức năng điều hành hoạt động kinh doanh xe theo từng thị trường thông qua các bộ phận kế hoạch kinh doanh; sản phẩm và Marketing.",
          "Kinh doanh:",
          "Xây dựng kế hoạch kinh doanh, chỉ tiêu bán hàng.",
          "Giao chỉ tiêu KD xe đến từng Showroom/ Phòng/Nhóm bán hàng. Quản trị thực hiện chỉ tiêu đến từng TVBH.",
          "Lập kế hoạch đặt hàng; quản trị tồn kho và hoạt động điều phối đơn vị.",
          "Sản phẩm:",
          "Tham gia hoạt động đào tạo kiến thức sản phẩm, bán hàng.",
          "Thông tin phản hồi về chất lượng sản phẩm. Đề xuất nâng cấp và phát triển sản phẩm theo yêu cầu của thị trường.",
          "Marketing:",
          "Xây dựng và triển khai các hoạt động Marketing theo Thương hiệu, phân khúc, sản phẩm theo định hướng từ VPĐH.",
          "Hướng dẫn, triển khai và kiểm soát hoạt động Marketing trực tiếp tại các Showroom."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Kinh doanh xe theo Nhóm Thương hiệu/ Nhóm xe",
        "items": [
          "Thực hiện hoạt động bán hàng, tìm kiếm khách hàng, đảm bảo hoàn thành các chỉ tiêu bán hàng theo mẫu xe, thương hiệu và theo quy định của THACO AUTO.",
          "Thực hiện hoạt động Marketing bán hàng, trực tiếp chăm sóc khách hàng.",
          "Phản hồi các thông tin thị trường và chất lượng sản phẩm."
        ]
      }
    ]
  },
  {
    "id": "func-8",
    "slide": 8,
    "group": "Kinh doanh",
    "title": "Kinh doanh Xe Tải, Bus",
    "deptCode": "KDTB",
    "sections": [
      {
        "level": "VP Công ty",
        "scope": "Kinh doanh xe Tải, Bus",
        "items": [
          "Quản trị hoạt động kinh doanh theo nhóm Tải, Bus, nhóm xe tại Công ty, Showroom/Đại lý. Có các chức năng: Kế hoạch; Sản phẩm; Marketing.",
          "Kế hoạch kinh doanh:",
          "Thông tin thị trường, phân tích và dự báo thị trường. Xây dựng và quản trị chính sách bán hàng theo thương hiệu/ theo từng địa bàn.",
          "Quản trị, kiểm soát công tác mua hàng, bán hàng và hoạt động điều phối, quản lý tồn kho xe.",
          "Quản trị thực hiện chỉ tiêu các Showroom.",
          "Sản phẩm:",
          "Phân tích định vị sản phẩm, thông tin cạnh tranh, biên soạn tài liệu về sản phẩm, bán hàng, Marketing và triển khai đào tạo.",
          "Phản hồi các thông tin về chất lượng sản phẩm, đề xuất nâng cấp phát triển sản phẩm về VPĐH.",
          "Marketing:",
          "Tham gia quản trị hoạt động Marketing bán hàng theo vùng thị trường.",
          "Tham gia hoạt động chăm sóc khách hàng lớn, khách hàng doanh nghiệp.",
          "Định hướng, triển khai và kiểm soát các hoạt động chăm sóc khách hàng."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Kinh doanh xe theo Nhóm sản phẩm",
        "items": [
          "Kinh doanh xe theo nhóm sản phẩm điều hành hoạt động kinh doanh nhóm sản phẩm theo từng thị trường thông qua các bộ phận kế hoạch kinh doanh, sản phẩm và Marketing.",
          "Kinh doanh:",
          "Xây dựng kế hoạch kinh doanh, chỉ tiêu bán hàng.",
          "Giao chỉ tiêu KD xe đến từng Showroom/ Phòng/Nhóm bán hàng. Quản trị thực hiện chỉ tiêu đến từng TVBH.",
          "Lập kế hoạch đặt hàng; quản trị tồn kho và hoạt động điều phối đơn vị.",
          "Sản phẩm:",
          "Tham gia hoạt động đào tạo kiến thức sản phẩm, bán hàng.",
          "Thông tin phản hồi về chất lượng sản phẩm. Đề xuất nâng cấp và phát triển sản phẩm theo yêu cầu của thị trường.",
          "Marketing:",
          "Xây dựng và triển khai các hoạt động Marketing theo Thương hiệu, phân khúc, sản phẩm theo định hướng từ VPĐH.",
          "Hướng dẫn, triển khai và kiểm soát hoạt động Marketing trực tiếp tại các Showroom."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Kinh doanh xe Tải, Bus",
        "items": [
          "Thực hiện hoạt động bán hàng, tìm kiếm khách hàng, đảm bảo hoàn thành các chỉ tiêu bán hàng theo mẫu xe, thương hiệu và theo quy định của THACO AUTO.",
          "Thực hiện hoạt động Marketing bán hàng, trực tiếp chăm sóc khách hàng.",
          "Phản hồi các thông tin thị trường và chất lượng sản phẩm."
        ]
      }
    ]
  },
  {
    "id": "func-9",
    "slide": 9,
    "group": "Kinh doanh",
    "title": "Kinh doanh Dịch vụ Phụ tùng (DL / TB)",
    "deptCode": "DVDL / DVTB",
    "sections": [
      {
        "level": "VP Công ty",
        "scope": "Kinh doanh DVPT xe Du lịch/ xe Tải, Bus",
        "items": [
          "Bộ phận KD DVPT được tổ chức theo kinh doanh DVPT xe Du lịch và kinh doanh DVPT xe Tải, Bus. Quản trị hoạt động KD DVPT và hệ thống xưởng tại Công ty, Showroom/Đại lý với các chức năng: Kế hoạch; Layout, thiết bị & QLVH Xưởng; Kỹ thuật & Công nghệ sửa chữa.",
          "Kế hoạch kinh doanh:",
          "Quản trị thông tin, phân tích và dự báo thị trường. Quản trị các chính sách kinh doanh DVPT xe Du lịch/Tải, Bus",
          "Quản trị Kiểm soát thực hiện chỉ tiêu theo ngày/ tuần/ tháng/ quý, đảm bảo hoàn thành chỉ tiêu kinh doanh DVPT.",
          "Đề xuất VPĐH phát triển sản phẩm DVPT; Đề xuất xây dựng các sản phẩm, gói dịch vụ và biên soạn tài liệu đào tạo, huấn luyện DVPT phù hợp với thị trường.",
          "Triển khai hoạt động Marketing và chăm sóc khách hàng Quản lý chất lượng dịch vụ, sự hài lòng khách hàng.",
          "Quản trị, kiểm soát công tác mua hàng và hoạt động điều phối, quản lý tồn kho PT-VT.",
          "Layout, thiết bị & Quản lý vận hành Xưởng:",
          "Quản trị vận hành hệ thống xưởng theo đúng layout, công năng, quy định, quy trình. vận hành nâng cao công suất xưởng & năng suất lao động.",
          "Quản trị đầu tư, điều chuyển giữa các SR, duy tu bảo trì TB-CCDC.",
          "Kỹ thuật & Công nghệ sửa chữa:",
          "Quản trị chất lượng sửa chữa & hỗ trợ trực tiếp các trường hợp sửa chữa khó. Triển khai các giải pháp kỹ thuật, công nghệ sửa chữa máy gầm, điện, điện tử, hệ thống thông minh, Công nghệ sửa chữa đồng sơn.",
          "Quản trị hoạt động NV bảo hành, xét duyệt BCKT từ các SR, phản hồi chất lượng & chính sách, Kiểm soát chi phí bảo hành tại đơn vị."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Kinh doanh DVPT theo Nhóm xe/ nhóm TH/ Tải/ Bus, Mini Bus",
        "items": [
          "Bộ phận Kinh doanh DVPT được tổ chức theo từng Nhóm xe/ Nhóm TH/ Tải/ Bus, Mini Bus. Điều hành hoạt động kinh doanh DVPT tại hệ thống xưởng thông qua các bộ phận Kế hoạch Kinh doanh; Layout, thiết bị & QLVH Xưởng; Kỹ thuật & Công nghệ sửa chữa.",
          "Kế hoạch kinh doanh:",
          "Khảo sát thị trường và đề xuất xây dựng các giải pháp, chính sách cạnh tranh theo Nhóm xe/ Nhóm TH cho từng thị trường.",
          "Xây dựng & đăng ký và phân giao chỉ tiêu KD DVPT và cam kết thực hiện cho từng Showroom.",
          "Xây dựng, triển khai KD sản phẩm DV, PT-VT; Tổ chức đào tạo bán hàng sản phẩm cho nhân sự DVPT.",
          "Triển khai các hoạt động Marketing DVPT theo thương hiệu (truyền thông, CSKH, sự kiện..).",
          "Cung cấp các thông tin liên quan cung ứng PT-VT của các nhóm xe/ nhóm TH. Điều phối & Tối ưu hóa kho PT-VT.",
          "Layout, thiết bị & Quản lý vận hành Xưởng:",
          "Tổ chức thực hiện đào tạo sử dụng trang thiết bị theo tiêu chuẩn thương hiệu.",
          "Thực hiện đánh giá, rà soát, kiểm kê, báo cáo định kỳ thực trạng CCDC, đề xuất đầu tư,bổ sung CCDC tiêu chuẩn theo thương hiệu.",
          "Kỹ thuật & Công nghệ sửa chữa:",
          "Triển khai bản tin kỹ thuật và tài liệu hướng dẫn sửa chữa theo tiêu chuẩn từng thương hiệu.",
          "Triển khai hoạt động đào tạo chuyên môn sửa chữa theo chuyên đề kỹ thuật cho đội ngũ NS tại các xưởng.",
          "Kiểm soát, gia tăng tỷ lệ các nhân sự hoàn thành các chứng chỉ theo yêu cầu thương hiệu."
        ]
      },
      {
        "level": "Showroom/Đại lý",
        "scope": "Kinh doanh DVPT xe Du lịch/ xe Tải, Bus",
        "items": [
          "Bộ phận Bán hàng DVPT tại Showroom có chức năng Bán hàng DVPT, dịch vụ sửa chữa và chăm sóc khách hàng.",
          "Bán hàng DVPT",
          "Bán hàng DV: Quản lý, chăm sóc, khai thác khách hàng dịch vụ. Tư vấn, bán hàng DVPT, dịch vụ sửa chữa.",
          "Bán hàng PT-VT: Thực hiện mua hàng, bán hàng đáp ứng được yêu cầu hoạt động sửa chữa. Chăm sóc và tìm kiếm khách hàng, bán hàng PT-VT; Thực hiện cấp phát, quản lý xuất nhập PT-VT và sắp xếp, bảo quản, đảm bảo chất lượng PT-VT lưu kho.",
          "Xưởng DVSC",
          "Hoạt động xưởng DVSC: Thực hiện hoạt động sửa chữa, kiểm soát tiến độ sửa chữa, chất lượng sửa chữa."
        ]
      }
    ]
  },
  {
    "id": "func-11",
    "slide": 11,
    "group": "Nghiệp vụ Quản trị Chuyên ngành",
    "title": "Quản trị Chi phí, Giá thành",
    "deptCode": "TCKT",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Quản trị Chi phí, Giá thành",
        "items": [
          "Kinh doanh xe"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "Kinh doanh DVPT"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Quản trị Chi phí, Giá thành",
        "items": [
          "Ban hành định mức chi phí, quản trị chi phí giá thành xe (theo mẫu xe) của từng Showroom trực thuộc.",
          "Phối hợp lập kế hoạch và kiểm soát thực hiện chi phí giá thành tại Showroom.",
          "Kiểm soát việc ghi nhận chi phí KD Xe thực tế kịp thời, đầy đủ và chính xác trên hệ thống máy. Kiểm soát trung thực số liệu giữa quản trị và hạch toán kế toán."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Ban hành định mức chi phí, quản trị chi phí giá thành DVPT (theo loại hình SC, lượt xe, RO) của từng Xưởng trực thuộc.",
          "Phối hợp lập kế hoạch và kiểm soát thực hiện chi phí giá thành tại Xưởng.",
          "Kiểm soát việc ghi nhận chi phí KD DVPT thực tế kịp thời, đầy đủ và chính xác trên hệ thống máy. Kiểm soát trung thực số liệu giữa quản trị và hạch toán kế toán."
        ]
      }
    ]
  },
  {
    "id": "func-12",
    "slide": 12,
    "group": "Nghiệp vụ Quản trị Chuyên ngành",
    "title": "Quản lý Tiêu chuẩn hoạt động, Cơ sở vật chất",
    "deptCode": "NVCN",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Quản lý TCHĐ, CSVC",
        "items": [
          "Quản lý TCHĐ"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "Quản lý CSVC"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Quản lý TCHĐ, CSVC",
        "items": [
          "Ban hành TCHĐ tại Công ty theo bộ tiêu chuẩn hoạt động khung từ VPĐH.",
          "Triển khai và kiểm soát việc áp dụng các tiêu chuẩn hoạt động tại Công ty."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Triển khai các quy định, quy trình quản lý tài sản theo hướng dẫn của THACO AUTO.",
          "Tham gia nghiệm thu, tiếp nhận, theo dõi ghi nhận hình thành tài sản. Bàn giao, quản lý, sử dụng và khai thác vận hành hiệu quả tài sản.",
          "Lập, tổ chức thực hiện và kiểm soát kế hoạch, chi phí duy tu bảo trì theo tiêu chuẩn, hướng dẫn, quy định, quy trình ban hành.",
          "Đánh giá nhu cầu đầu tư, NCCT và đề xuất phương án triển khai.",
          "Phối hợp và kiểm soát kế hoạch, tiến độ & chất lượng thi công nâng cấp cải tạo do THACO AUTO thực hiện."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Quản lý TCHĐ, CSVC",
        "items": [
          "Chịu trách nhiệm triển khai, tuân thủ các tiêu chuẩn ban hành từ Công ty và THACO AUTO."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Phạm vi 2",
        "items": [
          "Quản lý, sử dụng hiệu quả tài sản đầu tư.",
          "Tổ chức vận hành các công trình Showroom, Xưởng theo đúng công năng, quy trình, quy định ban hành.",
          "Kiểm soát, tuân thủ kế hoạch duy tu bảo trì đảm bảo quy định, quy trình."
        ]
      }
    ]
  },
  {
    "id": "func-13",
    "slide": 13,
    "group": "Nghiệp vụ Quản trị Chuyên ngành",
    "title": "Quản lý Chất lượng, GNVC & Kho xe",
    "deptCode": "NVCN",
    "sections": [
      {
        "level": "VP Công ty",
        "scope": "Quản lý Chất lượng xe Du lịch/ Tải, Bus",
        "items": [
          "Triển khai, hướng dẫn và giám sát các Showroom/Đại lý tuân thủ thực hiện theo các QĐ, QT Quản lý chất lượng.",
          "Theo dõi, phân tích, báo cáo tình hình lỗi chất lượng, kiểm soát chi phí chất lượng và đề xuất cải tiến chất lượng sản phẩm.",
          "Kiểm soát bảo quản, bảo dưỡng xe lưu kho, trưng bày, cảnh báo ngăn ngừa rủi ro và chi phí chất lượng tại các Showroom/Đại lý."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Quản lý Giao nhận vận chuyển",
        "items": [
          "Triển khai và kiểm soát tuân thủ thực hiện quy định, quy trình, tiêu chuẩn hoạt động GNVC (an toàn chằng buộc hàng hóa, chất lượng vận chuyển, …).",
          "Kiểm soát tuân thủ Hợp đồng vận chuyển với các đối tác vận chuyển (giá cước, chất lượng dịch vụ,..).",
          "Quản trị, kiểm soát hiệu quả hoạt động xe chuyên dụng chở và cứu hộ xe.",
          "Kiểm soát tiến độ, thời gian, chất lượng xe giao nhận vận chuyển.",
          "Hướng dẫn nghiệp vụ nhân sự QL GNVC tại Showroom."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Quản lý Kho xe & Lái xe",
        "items": [
          "Thực hiện quy hoạch sử dụng kho xe tại Công ty và Vận hành kho xe theo Layout công năng.",
          "Kiểm soát chi phí hoạt động kho xe tại các Showroom trực thuộc.",
          "Kiểm tra, giám sát thực hiện bảo quản, bảo dưỡng xe (xe mới, xe công, xe lái thử,…) theo QĐ/QT.",
          "Quản lý tồn kho (số lượng, nhập - xuất – tồn, thời gian tồn,…) và dữ liệu trên phần mềm DDMS tại các Showroom trực thuộc.",
          "Kiểm soát tuân thủ 5S, PCCN, an toàn tài sản xe tại kho.",
          "Thực hiện hướng dẫn & đào tạo nghiệp vụ QL kho xe tại Showroom."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Quản lý Chất lượng xe Du lịch/ Tải, Bus",
        "items": [
          "Thực hiện giao nhận, kiểm tra chất lượng xe giao nhận vận chuyển.",
          "Tuân thủ nhập liệu theo tiến độ xe giao nhận lên phần mềm quản trị hệ thống (DDMS).",
          "Thực hiện quản lý chất lượng xe lưu kho (bảo quản, bảo dưỡng xe mới, xe công, xe lái thử,….) theo quy định, quy trình.",
          "Vận hành kho xe theo Layout công năng.",
          "Sử dụng nhiên liệu, vật tư theo định mức.",
          "Thực hiện nhập liệu nhập, xuất, tồn kho xe.",
          "Thực hiện 5S, PCCC, an toàn tài sản kho xe."
        ]
      }
    ]
  },
  {
    "id": "func-14",
    "slide": 14,
    "group": "Nghiệp vụ Quản trị Chuyên ngành",
    "title": "Hỗ trợ Tín dụng, Bảo hiểm",
    "deptCode": "HTKD",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Hỗ trợ Tín dụng, Bảo hiểm",
        "items": [
          "Hỗ trợ Tín dụng"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "Bảo hiểm"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Hỗ trợ Tín dụng, Bảo hiểm",
        "items": [
          "Tổ chức triển khai thực hiện nghiệp vụ tín dụng tại đơn vị theo định hướng.",
          "Theo dõi, cập nhật kịp thời chính sách tín dụng của các đối tác tín dụng đến các Showroom.",
          "Xây dựng và phát triển quan hệ hợp tác với các đối tác tín dụng tại địa phương.",
          "Ban hành quy định, quy trình quản trị hoạt động nội bộ; hướng dẫn và kiểm soát việc thực hiện.",
          "Kiểm soát việc phân bổ hồ sơ với các TCTD và phối hợp Showroom xử lý các vướng mắc/ bất cập (nếu có).",
          "Quản trị hệ thống dữ liệu thông tin tín dụng trên phần mềm DDMS đảm bảo đầy đủ, chính xác.",
          "Đánh giá hiệu quả hợp tác với đối tác định kỳ; đề xuất cải tiến (nếu có).",
          "Tổ chức đào tạo và phối hợp với đối tác tổ chức đào tạo các chuyên đề cho các NS tại Showroom."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Tổ chức triển khai thực hiện nghiệp vụ bảo hiểm tại đơn vị theo định hướng.",
          "Theo dõi, cập nhật kịp thời chính sách phí bảo hiểm của các đối tác bảo hiểm có hợp tác đến các Showroom.",
          "Xây dựng và phát triển quan hệ hợp tác với các đối tác bảo hiểm tại địa phương.",
          "Thực hiện giao và kiểm soát thực hiện KPI về tỷ lệ khai thác Bảo hiểm bán mới/tái tục tại Showroom; kiểm soát & có báo cáo đánh giá/ tham mưu BLĐ.",
          "Thực hiện ký kết Hợp đồng/Thỏa thuận hợp tác với các đối tác Bảo hiểm đảm bảo tính pháp lý.",
          "Ban hành quy định, quy trình quản trị hoạt động nội bộ; hướng dẫn và kiểm soát việc thực hiện.",
          "Kiểm soát việc phân bổ hồ sơ với các đối tác Bảo hiểm và phối hợp Showroom xử lý các vướng mắc/ bất cập (nếu có).",
          "Quản trị hệ thống dữ liệu thông tin bảo hiểm trên PM DDMS đảm bảo đầy đủ, chính xác.",
          "Đánh giá hiệu quả hợp tác với đối tác định kỳ; đề xuất cải tiến (nếu có).",
          "Tổ chức đào tạo và phối hợp với đối tác tổ chức đào tạo các chuyên đề cho các NS tại Showroom."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Hỗ trợ Tín dụng, Bảo hiểm",
        "items": [
          "Tổ chức & chịu trách nhiệm hiệu quả hoạt động tín dụng, bảo hiểm tại Showroom.",
          "Thực hiện tư vấn, giới thiệu sản phẩm tín dụng, bảo hiểm đến khách hàng; đảm bảo hoàn thành KPI (Bảo hiểm) được giao.",
          "Nhập liệu đúng - đủ - kịp thời các thông tin tín dụng, bảo hiểm lên PM DDMS.",
          "Liên hệ và phối hợp với các đối tác tín dụng có hợp tác để làm thủ tục vay vốn, theo dõi tiến độ thực hiện.",
          "Theo dõi tiến độ hồ sơ vay/ giải ngân, cấp đơn bảo hiểm và đối chiếu, thanh toán công nợ bảo hiểm đúng hạn.",
          "Thực hiện hạch toán, ghi nhận tiền giải ngân. công nợ bảo hiểm, XHĐ hoa hồng BH đầy đủ, chính xác và đúng quy định."
        ]
      }
    ]
  },
  {
    "id": "func-16",
    "slide": 16,
    "group": "Nghiệp vụ Quản trị Cơ bản",
    "title": "Kế hoạch Tổng hợp",
    "deptCode": "NVKH",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Kế hoạch tổng hợp",
        "items": [
          "Kế hoạch SXKD"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "Hệ thống Quản trị & QĐ-QT"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Kế hoạch tổng hợp",
        "items": [
          "Tổng hợp, theo dõi tiến độ thực hiện kế hoạch hoạt động của các Showroom, Đại lý theo mảng hoạt động; Đầu mối triển khai, theo dõi thực hiện các chỉ đạo của BLĐ Công ty.",
          "Kiểm soát thực hiện. Tham gia vào công tác chuyển đổi số tại Đơn vị."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Hệ thống quản trị: Triển khai xây dựng và ban hành Tài liệu hệ thống quản trị chi tiết (Cấu trúc, chức năng nhiệm vụ, trách nhiệm các vị trí, tiêu chí- tiêu chuẩn) của các đơn vị, bộ phận tại Công ty và các Showroom trực thuộc.",
          "Quy định - quy trình: Biên soạn, trình duyệt, ban hành các QĐ-QT liên quan quản trị hoạt động tại Đơn vị. Quản lý hệ thống quy định, quy trình hoạt động, kiểm soát tuân thủ và đề xuất điều chỉnh theo thực tiễn hoạt động và yêu cầu quản trị.",
          "Triển khai thực hiện các thủ tục pháp lý doanh nghiệp và quản trị thông tin pháp lý tại Đơn vị: hồ sơ đăng ký, hủy bỏ, sáp nhập pháp nhân."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Kế hoạch tổng hợp",
        "items": [
          "Chủ động triển khai các giải pháp để hoàn thành kế hoạch kinh doanh và quản trị tại Showroom."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Phạm vi 2",
        "items": [
          "Điều hành theo hệ thống quản trị và QĐ-QT đã ban hành, phản hồi các đề xuất cải tiến phù hợp với đặc thù hoạt động."
        ]
      }
    ]
  },
  {
    "id": "func-17",
    "slide": 17,
    "group": "Nghiệp vụ Quản trị Cơ bản",
    "title": "Kế toán – Tài chính",
    "deptCode": "TCKT",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Kế toán – Tài chính",
        "items": [
          "Thanh toán & Công nợ"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "BC Tài chính & BC Thuế"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Kế toán – Tài chính",
        "items": [
          "Quản lý thu – chi – công nợ khách hàng, nhà cung cấp.",
          "Tiếp nhận kế hoạch thanh toán, kiểm tra và lập Phiếu thu/ chi/ UNC.",
          "Kiểm tra bộ chứng từ để ghi nhận sổ sách về công nợ; tạm ứng; chi phí lương, bảo hiểm."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Kiểm soát hạch toán kế toán theo quy định.",
          "Lập BCTC, báo cáo thuế, báo cáo nộp NSNN.",
          "Quản lý hóa đơn, chứng từ & sổ sách kế toán.",
          "Quản lý & kiểm kê định kỳ Tài sản, tồn kho."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Kế toán – Tài chính",
        "items": [
          "Hỗ trợ bán hàng xe, hỗ trợ bán hàng DVPT:",
          "Phát hành hóa đơn bán hàng, tiếp nhận thanh toán và xác nhận giao dịch với khách hàng, với văn phòng Công ty.",
          "Quản lý và bàn giao hồ sơ xe, hồ sơ sửa chữa đầy đủ, đúng quy định.",
          "Theo dõi nhập – xuất – tồn kho xe, PT-VT & cập nhật kịp thời để hỗ trợ kinh doanh.",
          "Cập nhật thông tin tín dụng, bảo hiểm; đối chiếu công nợ với đối tác ngân hàng, bảo hiểm",
          "Quản lý và cập nhật thông tin chi phí kinh doanh xe, DVPT trên Hệ thống phần mềm."
        ]
      }
    ]
  },
  {
    "id": "func-18",
    "slide": 18,
    "group": "Nghiệp vụ Quản trị Cơ bản",
    "title": "Nghiệp vụ Nhân sự",
    "deptCode": "HCNS",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Nghiệp vụ Nhân sự",
        "items": [
          "ĐGNS & Tuyển dụng"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "QL Nhân sự & tiền lương"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Nghiệp vụ Nhân sự",
        "items": [
          "Triển khai, thực hiện đánh giá nhân sự; thực hiện tuyển dụng theo phân cấp tại Công ty. Tổng hợp nhu cầu, lập kế hoạch và tổ chức các chuyên đề đào tạo.",
          "Thực hiện nghiệp vụ quản lý nhân sự (ký kết HĐLĐ, điều chuyển, bổ nhiệm, khen thưởng, kỷ luật, chấm dứt HĐLĐ) & tiền lương tại Công ty. Đại diện Công ty làm việc với các Cơ quan QLLĐ."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Thực hiện quản lý nhân sự theo thành phần tại Công ty; phân tích năng suất, phản hồi và đề xuất điều chỉnh chính sách phù hợp thực tiễn.",
          "Quản trị TC-TC nhân sự; định biên, năng suất & chi phí nhân sự.",
          "Tham mưu cho lãnh đạo trong công tác nhân sự (tuyển dụng, điều chuyển, bổ nhiệm, …)"
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Nghiệp vụ Nhân sự",
        "items": [
          "Thực hiện tuân thủ theo QĐ-QT ban hành từ VP Công ty.",
          "Tiếp nhận, triển khai và thực hiện công tác nhân sự theo phân cấp.",
          "Quản trị năng suất, chi phí nhân sự tại Showroom và đề xuất điều chỉnh chính sách phù hợp với thực tiễn.",
          "Quản trị việc lập kế hoạch đào tạo, tổ chức đào tạo, đánh giá hiệu quả nhân sự tại Showroom."
        ]
      }
    ]
  },
  {
    "id": "func-19",
    "slide": 19,
    "group": "Nghiệp vụ Quản trị Cơ bản",
    "title": "Marketing",
    "deptCode": "MKT",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Marketing",
        "items": [
          "Kế hoạch Marketing"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "CSKH"
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Marketing",
        "items": [
          "Triển khai Marketing đa thương hiệu và các phương thức Marketing mới; Quản trị kế hoạch và ngân sách Marketing tại Công ty.",
          "Quản lý sử dụng các giải pháp kỹ thuật: kênh trực tuyến, công cụ Marketing, tư liệu Marketing, AVP, quà tặng và tổ chức sự kiện.",
          "Triển khai thực hiện các kế hoạch Marketing bán hàng, tư liệu theo thương hiệu, sản phẩm theo phê duyệt của TGĐ Công ty và định hướng của VPĐH.",
          "Hướng dẫn, kiểm soát hoạt động Marketing bán hàng của các Showroom, Đại lý."
        ]
      },
      {
        "level": "VP Công ty",
        "scope": "Phạm vi 2",
        "items": [
          "Quản lý thông tin dữ liệu khách hàng; Ứng dụng phần mềm CRM & phần mềm chuyên môn.",
          "Triển khai các hoạt động CSKH theo định hướng; Quản lý xử lý PN/KN và chất lượng phục vụ khách hàng theo triết lý “Tận tâm phục vụ”.",
          "Quản lý dữ liệu Lead và khách hàng tiềm năng; Theo dõi chỉ số đánh giá khách hàng mua xe/dịch vụ, tổng hợp kết quả, đề xuất giải pháp cải thiện hoạt động.",
          "Phối hợp triển khai các chương trình CSKH theo chiến dịch kinh doanh và định hướng từ VPĐH."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Marketing",
        "items": [
          "Quản lý dữ liệu Khách hàng của Showroom, của THACO AUTO, kiểm soát quá trình tư vấn, CSKH mua xe/ sử dụng dịch vụ."
        ]
      }
    ]
  },
  {
    "id": "func-20",
    "slide": 20,
    "group": "Nghiệp vụ Quản trị Cơ bản",
    "title": "Quản trị Văn phòng & An sinh đời sống",
    "deptCode": "HCNS",
    "sections": [
      {
        "level": "Cấp 1",
        "scope": "Quản trị văn phòng & An sinh đời sống",
        "items": [
          "Quản lý Hậu cần"
        ]
      },
      {
        "level": "Cấp 1",
        "scope": "Phạm vi 2",
        "items": [
          "Quản lý Bảo vệ, Đón tiếp Khách hàng"
        ]
      },
      {
        "level": "VP CÔNG TY",
        "scope": "Quản trị văn phòng & An sinh đời sống",
        "items": [
          "Ban hành, triển khai thực hiện các quy định, quy trình; tổ chức đào tạo, hướng dẫn, kiểm soát công tác dịch vụ hậu cần:",
          "Phục vụ khách hàng: Kiểm soát các tiêu chuẩn phục vụ khách hàng theo từng loại hình Showroom; đánh giá, triển khai các giải pháp cải tiến dịch vụ; quản lý, các chi phí phát sinh, điều chỉnh.",
          "Vệ sinh, 5S: Kiểm soát, đánh giá các tiêu chuẩn vệ sinh, 5S tại các Showroom. Triển khai các giải pháp cải tiến, nâng cấp; quản lý các định mức chi phí, áp dụng các giải pháp công nghệ nâng cao hiệu suất công việc.",
          "Thực hiện các dịch vụ hỗ trợ văn phòng, văn thư lưu trữ tại văn phòng Công ty; triển khai thực hiện và kiểm soát các quy định, quy trình dịch vụ hỗ trợ văn phòng tại các Showroom."
        ]
      },
      {
        "level": "VP CÔNG TY",
        "scope": "Phạm vi 2",
        "items": [
          "Ban hành, triển khai thực hiện các quy định, quy trình; tổ chức đào tạo, hướng dẫn, kiểm soát công tác:",
          "AN-BV: triển khai thực hiện các quy định, quy trình và phê duyệt phương án An ninh - Bảo vệ theo CSVC tại Showroom; kiểm soát rủi ro, các tiêu chuẩn an ninh, bảo vệ.",
          "Đón tiếp khách hàng: Triển khai, kiểm soát tiêu chuẩn, chất lượng đón tiếp khách tại các Showroom, cải tiến và đổi mới phù hợp thực tế.",
          "PCCN: Triển khai và kiểm soát thực hiện các phương án, hồ sơ, nội quy PCCN nội bộ; tập huấn PCCN định kỳ tại các Showroom.",
          "ATLĐ: Kiểm soát mức độ tuân thủ quy định, triển khai các phương án đảm bảo an toàn, ngăn ngừa rủi ro.",
          "PCTT: Triển khai phương án PCTT phù hợp điều kiện CSVC, địa hình, địa lý tại các Showroom, bảo đảm phương án ứng phó kịp thời.",
          "Triển khai và kiểm soát các quy định, quy trình về quản lý trang thiết bị văn phòng."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Quản trị văn phòng & An sinh đời sống",
        "items": [
          "Tổ chức thực hiện, quản lý các tiêu chuẩn, chất lượng phục vụ khách hàng; công tác vệ sinh, 5S, văn thư, quản lý chi phí phát sinh:",
          "Phục vụ khách hàng: thực hiện công tác phục vụ khách hàng theo quy trình và các tiêu chuẩn với tinh thần tận tâm phục vụ; quản lý vật tư, vật phẩm chi phí liên quan; ghi nhận, xử lý và phản hồi đánh giá của khách hàng đối với dịch vụ; hậu cần các chương trình sự kiện, hội họp.",
          "Vệ sinh, 5S: Thực hiện và kiểm tra, kiểm soát công tác vệ sinh, 5S tại các khu vực theo quy định; thực hiện vệ sinh theo quy trình trên từng loại bề mặt; quản lý hóa phẩm, vật tư tiêu hao; kiểm soát công tác chăm sóc cảnh quan, cây xanh.",
          "Thực hiện các dịch vụ hỗ trợ, hậu cần, tiện ích theo tiêu chuẩn, định mức."
        ]
      },
      {
        "level": "Showroom/ Đại lý",
        "scope": "Phạm vi 2",
        "items": [
          "Tổ chức thực hiện và quản lý các phương án về an ninh bảo vệ, PCCN, ATLĐ, PCTT, kiểm soát các rủi ro phát sinh:",
          "AN-BV: Bố trí thực hiện theo phương án AN-BV, đảm bảo an ninh, an toàn cho hoạt động kinh doanh.",
          "Đón tiếp khách hàng: Thực hiện đón tiếp, hướng dẫn khách theo quy trình, với tác phong chuyên nghiệp.",
          "PCCN: thực hiện phương án PCCN; kiểm tra tuân thủ, duy trì hệ thống PCCN sẵn sàng hoạt động; tổ chức diễn tập định kỳ, xử lý sự cố theo quy định.",
          "ATLĐ: Thực thi biện pháp, phương án an toàn, kiểm tra, giám sát thực hiệc các quy định; xử lý các sự cố theo quy trình và thực tế.",
          "PCTT: quản lý thông tin thiên tai, trực hiện phương án PCTT, ứng phó linh hoạt theo điều kiện thực tế.",
          "Quản lý trang thiết bị VP; vận hành CSVC, hệ thống MEP theo quy trình, báo cáo tình trạng vận hành, sự cố."
        ]
      }
    ]
  }
];

export const orgPositionsData: OrgPositionItem[] = [
  {
    "id": "pos-1",
    "order": 1,
    "slide": 24,
    "deptCode": "BGD",
    "deptName": "Ban Lãnh đạo Công ty",
    "category": "Lãnh đạo",
    "title": "TGĐ Công ty",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm toàn diện hoạt động THACO AUTO NGHỆ AN theo ủy quyền từ Người đại diện pháp luật; Quản trị tuân thủ theo các quy định quản trị từ THACO, THACO AUTO và quy định của pháp luật. Tổ chức, quản trị, điều hành các hoạt động Kinh doanh, các NVQT Cơ bản, NVQT Chuyên ngành xuyên suốt phục vụ hoạt động của Công ty, Showroom/ Đại lý.",
      "Chịu trách nhiệm về chỉ tiêu kinh doanh (Doanh số xe, thị phần thương hiệu; Doanh thu DVPT), chỉ tiêu tài chính (Tổng doanh thu, Doanh thu HH còn lại, Tổng chi phí, Lợi nhuận sau thuế).",
      "Thực hiện công tác quản trị thị trường, chăm sóc Khách hàng tại địa phương (Khách hàng lớn, Khách hàng quan trọng, khách hàng có tầm ảnh hưởng). Xây dựng Thương hiệu THACO AUTO, tạo mối quan hệ và kết nối với Cộng đồng doanh nghiệp tại địa phương.",
      "Quản trị nhân sự, hoạch định phát triển nhân sự Lãnh Đạo & Tiềm năng, tuyển dụng và kiện toàn bộ máy nhân sự.",
      "Quản trị Kế toán tài chính tuân thủ đúng theo quy định nội bộ và quy định pháp luật.",
      "Ban hành đầy đủ các quy định, quy trình phục vụ hoạt động kinh doanh và quản trị rủi ro hệ thống tại Công ty.",
      "Chịu trách nhiệm quy hoạch, thực hiện công tác đầu tư phát triển CSVC (Showroom, Xưởng) của Công ty. Thiết lập và duy trì mối quan hệ với cơ quan, ban ngành, đối tác địa phương.",
      "Xây dựng, triển khai các chương trình đào tạo và phát triển nhân sự Lãnh Đạo và tiềm năng tại Công ty.",
      "Tham gia các khóa đào tạo, tự đào tạo, nâng cấp hoàn thiện bản thân."
    ]
  },
  {
    "id": "pos-2",
    "order": 2,
    "slide": 24,
    "deptCode": "BGD",
    "deptName": "Ban Lãnh đạo Công ty",
    "category": "Lãnh đạo",
    "title": "P.TGĐ Cty PT Kinh doanh xe Du Lịch",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm quản trị và điều hành hoạt động Kinh doanh xe tại Công ty và các Showroom theo các nghiệp vụ kinh doanh: KHKD xe, Sản phẩm, Marketing. Tham gia quản lý và điều hành các NVQT Cơ bản, NVQT Chuyên ngành tại VP Công ty phục vụ hoạt động kinh doanh.",
      "Chịu trách nhiệm về chỉ tiêu kinh doanh (Doanh số, thị phần), chỉ tiêu tài chính (Doanh thu HH còn lại, chi phí kinh doanh xe) xe Du lịch/Tải, Bus; Quản lý và kiểm soát thực hiện chính sách bán hàng xe, hoạt động bán hàng - đặt hàng - tồn kho xe; điều hành và quản trị chi phí KD xe Du lịch/Tải, Bus tại các Showroom.",
      "Quản trị nhân sự, hoạch định phát triển nhân sự tiềm năng. Chịu trách nhiệm về Định biên, tuyển dụng và kiện toàn bộ máy nhân sự.",
      "Xây dựng và kiểm soát tính tuân thủ các chính sách bán hàng, các quy định, quy trình phục vụ hoạt động kinh doanh và quản trị rủi ro trong điều hành hoạt động kinh doanh xe.",
      "Quản lý Layout, CSVC, quy trình và tiêu chuẩn vận hành Showroom theo tiêu chuẩn thương hiệu và quy định của THACO AUTO.",
      "Triển khai các chương trình đào tạo cho thành phần nhân sự Bán hàng xe tại các Showroom.",
      "Tham gia các khóa đào tạo, tự đào tạo, nâng cấp hoàn thiện bản thân."
    ]
  },
  {
    "id": "pos-3",
    "order": 3,
    "slide": 24,
    "deptCode": "BGD",
    "deptName": "Ban Lãnh đạo Công ty",
    "category": "Lãnh đạo",
    "title": "GĐ Showroom",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm Quản trị và điều hành hoạt động của Showroom được giao phụ trách. Sử dụng các NVQT Cơ bản, NVQT Chuyên ngành, NV Kinh doanh tại VP Công ty phục vụ cho quản trị, điều hành hoạt động kinh doanh của Showroom phụ trách.",
      "Chịu trách nhiệm về chỉ tiêu kinh doanh của Showroom (Doanh số, thị phần; Doanh thu DVPT), chỉ tiêu tài chính của Showroom (Tổng doanh thu HH, Tổng chi phí, Lợi nhuận trước hợp nhất).",
      "Quản lý thị trường, thực hiện bán hàng và chăm sóc toàn bộ khách hàng của Showroom và của THACO AUTO tại thị trường quản lý.",
      "Triển khai thực hiện hoạt động bán hàng, tìm kiếm khách hàng, thực hiện các chỉ tiêu Bán hàng theo mẫu xe, phân khúc, thương hiệu và Bán hàng DVPT tại Showroom.",
      "Quản trị nhân sự, hoạch định phát triển nhân sự Tiềm năng, đề xuất tuyển dụng và kiện toàn bộ máy nhân sự tại Showroom phụ trách.",
      "Quản trị Kế toán tài chính tuân thủ đúng theo quy định nội bộ, quy định pháp luật.",
      "Kiểm soát tính tuân thủ các chính sách bán hàng được ban hành, các quy định, quy trình phục vụ hoạt động kinh doanh.",
      "Quản lý Layout, CSVC, quy trình và tiêu chuẩn vận hành Showroom, Xưởng dịch vụ đúng theo quy định.",
      "Xây dựng, triển khai các chương trình đào tạo, phát triển nhân sự tại Showroom.",
      "Tham gia các khóa đào tạo, tự đào tạo, nâng cấp hoàn thiện bản thân."
    ]
  },
  {
    "id": "pos-4",
    "order": 4,
    "slide": 25,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "GĐ KD Nhóm xe Cao cấp/ Nhóm xe Mainstream/ Xe Tải, Bus",
    "tier": 1,
    "duties": [
      "Quản trị và điều hành hoạt động Kinh doanh xe Nhóm TH BMW/Nhóm xe Stellantis/Nhóm xe Mainstream tại VP Công ty và các Showroom trực thuộc. Điều hành các nghiệp vụ kế hoạch, sản phẩm, marketing phục vụ hoạt động quản trị kinh doanh.",
      "Chịu trách nhiệm về chỉ tiêu doanh số xe theo nhóm xe/ nhóm thương hiệu, thị phần (theo phân khúc, thương hiệu), chi phí kinh doanh của nhóm xe/ nhóm thương hiệu phụ trách.",
      "Phân tích, đánh giá thị trường, xây dựng kế hoạch bán hàng, các chính sách bán hàng.",
      "Lập và kiểm soát việc thực hiện kế hoạch kinh doanh. Kiểm soát chính sách bán hàng, quản trị công tác đặt hàng, tồn kho bán hàng",
      "Tổ chức xây dựng các bộ tài liệu sản phẩm phục vụ bán hàng tại thị trường. Triển khai và quản trị các hoạt động Marketing bán hàng theo nhóm xe/ nhóm thương hiệu.",
      "Chịu trách nhiệm về quản trị năng suất của TVBH; Định biên, tuyển dụng kiện toàn nhân sự.",
      "Tổ chức hỗ trợ hoạt động kinh doanh tại các Đại lý độc lập theo phân công từ TGĐ Công ty.",
      "Đào tạo về Sản phẩm, Bán hàng & Marketing cho các thành phần nhân sự bán hàng tại các Showroom.",
      "Đào tạo phát triển nhân sự quản lý kinh doanh. Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-5",
    "order": 5,
    "slide": 25,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "TP KD nhóm xe Cao cấp/ Nhóm xe Mainstream/ Xe Tải, Bus",
    "tier": 2,
    "duties": [
      "Quản trị Kế hoạch; Sản phẩm; Marketing phục vụ hoạt động điều hành kinh doanh theo nhóm thương hiệu, nhóm xe tại Công ty, Showroom/Đại lý.",
      "Quản trị chung hoạt động kinh doanh theo nhóm xe/ nhóm thương hiệu quản lý tại VP Công ty và các Showroom. Chịu trách nhiệm về chỉ tiêu doanh số xe, thị phần (theo phân khúc, thương hiệu) theo nhóm xe/ nhóm thương hiệu phụ trách.",
      "Cập nhật thông tin thị trường, phân tích và dự báo thị trường. Xây dựng và quản trị chính sách bán hàng theo thương hiệu/ theo từng địa bàn, biên soạn, trình duyệt ban hành các quy định, quy trình, biểu mẫu trong quản trị, điều hành hoạt động kinh doanh xe và kiểm soát tuân thủ.",
      "Quản trị thực hiện chỉ tiêu các Showroom.",
      "Tham gia quản trị hoạt động Marketing bán hàng theo vùng thị trường.",
      "Quản trị, kiểm soát công tác mua hàng, bán hàng và hoạt động điều phối, công tác quản lý tồn kho xe.",
      "Đào tạo về Sản phẩm, Bán hàng & Marketing cho các thành phần nhân sự bán hàng theo nhóm xe/ nhóm thương hiệu phụ trách.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-6",
    "order": 6,
    "slide": 25,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "TP KD xe BMW/ Peugeot/ Jeep, Ram/ Kia/ Mazda/ Tải nhẹ, Tải trung/ Đầu kéo, Tải nặng/ Bus, Mini Bus",
    "tier": 2,
    "duties": [
      "Điều hành hoạt động kinh doanh xe theo thương hiệu/ nhóm thương hiệu/ nhóm xe theo từng thị trường thông qua các bộ phận kế hoạch kinh doanh, sản phẩm, Marketing. Phân tích và xây dựng, đề xuất các chính sách bán hàng phù hợp cho từng thị trường riêng biệt.",
      "Quản trị chung hoạt động kinh doanh xe theo thương hiệu quản lý tại VP Công ty và các Showroom. Chịu trách nhiệm về chỉ tiêu Doanh số xe, thị phần (theo phân khúc, thương hiệu) theo thương hiệu/ nhóm thương hiệu/ nhóm xe phụ trách.",
      "Triển khai xây dựng và giao chỉ tiêu bán hàng, kế hoạch kinh doanh đến từng Showroom/ Phòng/ Nhóm bán hàng theo thương hiệu phụ trách.",
      "Quản trị thực hiện chỉ tiêu theo thương hiệu tại các Showroom, đến từng NSBH.",
      "Lập kế hoạch đặt hàng, quản trị tồn kho và hoạt động điều phối.",
      "Triển khai và quản trị các hoạt động Marketing theo thương hiệu, phân khúc, sản phẩm theo định hướng từ VPĐH.",
      "Tham gia đào tạo về Sản phẩm, Bán hàng & Marketing cho các thành phần nhân sự bán hàng theo thương hiệu phụ trách.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-7",
    "order": 7,
    "slide": 26,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "TN Kế hoạch kinh doanh",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm tổng hợp, phân tích các thông tin thị trường. Kiểm soát công tác đặt hàng, điều phối, tồn kho. Lập và theo dõi kế hoạch thực hiện chỉ tiêu các thương hiệu và thực hiện các báo cáo phục vụ hoạt động kinh doanh xe theo nhóm xe/ nhóm thương hiệu được phân giao phụ trách.",
      "Chịu trách nhiệm theo dõi thông tin thị trường và phân tích dữ liệu thị trường theo phân khúc, thương hiệu.",
      "Lập, theo dõi, đánh giá và báo cáo thực hiện chỉ tiêu kinh doanh định kỳ theo nhóm xe/ nhóm thương hiệu.",
      "Triển khai & kiểm soát tuân thủ thực hiện các chương trình, chính sách bán hàng; quy định, quy trình về hoạt động bán hàng.",
      "Quản trị, kiểm soát công tác mua hàng, bán hàng và hoạt động điều phối, quản lý tồn kho xe.",
      "Đào tạo, hướng dẫn công việc chuyên môn cho các nhân sự thuộc bộ phận phụ trách.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-8",
    "order": 8,
    "slide": 26,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "CV Thị trường chính sách",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm nhiệm theo dõi thông tin thị trường và phân tích dữ liệu thị trường theo phân khúc, thương hiệu. Thực hiện các báo cáo theo dõi, đánh giá hiệu quả các chính sách bán hàng phục vụ hoạt động kinh doanh xe theo nhóm xe/ nhóm thương hiệu được phân giao phụ trách.",
      "Chịu trách nhiệm theo dõi thông tin thị trường và phân tích dữ liệu thị trường theo phân khúc, thương hiệu.",
      "Thực hiện lập các biểu mẫu theo dõi, đánh giá hiệu quả các chính sách bán hàng so với cùng kỳ.",
      "Phân tích dữ liệu thị trường, cung cấp các thông tin cạnh tranh phục vụ hoạt động dự báo, xây dựng các chính sách bán hàng theo đề xuất.",
      "Đề xuất tham mưu các chính sách bán hàng cho các nhóm sản phẩm cần gia tăng doanh số.",
      "Tham gia triển khai & kiểm soát tuân thủ thực hiện các chương trình chính sách bán hàng; quy định, quy trình về hoạt động bán hàng.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-9",
    "order": 9,
    "slide": 26,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "CV Đặt hàng điều phối",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm tổng hợp rà soát thông tin đặt hàng, theo dõi tiến độ đặt hàng và quản lý tỷ lệ tồn kho đáp ứng nhu cầu bán hàng và tuân thủ theo quy định; Điều phối bán hàng đảm bảo đáp ứng kịp thời phục vụ nhu cầu bán hàng.",
      "Thực hiện công tác đặt hàng và quản lý tồn kho.",
      "Theo dõi tiến độ đặt hàng, kế hoạch giao xe, hàng tồn đảm bảo kịp thời phục vụ bán hàng.",
      "Điều phối bán hàng giữa các Showroom, các Đơn vị; Đảm bảo đáp ứng kế hoạch kinh doanh.",
      "Tổ chức phân tích và quản trị dữ liệu đặt hàng, chi phí điều chuyển phục vụ bán hàng.",
      "Quản trị các chỉ số tồn kho, tồn hồ sơ xe đáp ứng bán hàng.",
      "Tham gia các khóa đào tạo về nghiệp vụ đặt hàng điều phối.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-10",
    "order": 10,
    "slide": 26,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "CV Bán hàng theo thương hiệu",
    "tier": 4,
    "duties": [
      "Tham gia kiểm soát việc thực hiện kế hoạch, chỉ tiêu kinh doanh xe, thực hiện các báo cáo phục vụ hoạt động kinh doanh xe theo nhóm xe/nhóm TH được phân giao. Ghi nhận các đề xuất từ Showroom để xây dựng chính sách bán hàng cạnh tranh tại từng thị trường phù hợp.",
      "Theo dõi diễn biến thị trường, hiệu quả các chính sách bán hàng.",
      "Kiểm soát thực hiện doanh số bán hàng xe theo thương hiệu.",
      "Thực hiện đánh giá hiệu quả các chính sách bán hàng, đề xuất các giải pháp bán hàng gia tăng doanh số.",
      "Lập kế hoạch, quản trị thực hiện chỉ tiêu bán hàng xe theo thương hiệu đến từng NSBH tại từng Showroom.",
      "Tham gia hoạt động đào tạo về sản phẩm, bán hàng, Marketing cho NSBH tại các Showroom theo thương hiệu phụ trách.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-11",
    "order": 11,
    "slide": 27,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "TN Sản phẩm",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm khảo sát thông tin thị trường, nhu cầu khách hàng, SP cạnh tranh tại địa bàn quản lý. Đề xuất nâng cấp sản phẩm hiện hữu và phát triển sản phẩm mới phù hợp với nhu cầu khách hàng tại địa phương. Tổng hợp, biên soạn & cập nhật tài liệu sản phẩm cho phòng bán hàng.",
      "Phân tích định vị sản phẩm, cung cấp các thông tin cạnh tranh.",
      "Biên soạn tài liệu về sản phẩm, bán hàng, Marketing và triển khai đào tạo.",
      "Quản trị Bộ tài liệu đào tạo sản phẩm, Bộ sales-talk, Bộ tài liệu sản phẩm phục vụ bán hàng.",
      "Phản hồi các thông tin về chất lượng sản phẩm, đề xuất nâng cấp phát triển sản phẩm về VPĐH.",
      "Triển khai đào tạo kiến thức sản phẩm, bán hàng, Marketing cho NSBH tại các Showroom. Tổ chức kiểm tra đánh giá sau đào tạo và đánh giá định kỳ.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-12",
    "order": 12,
    "slide": 27,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "CV Sản phẩm theo thương hiệu",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm khảo sát thông tin thị trường, nhu cầu khách hàng theo thương hiệu và các SP cạnh tranh trực tiếp tại địa bàn quản lý. Tổng hợp, biên soạn & cập nhật tài liệu so sánh trực tiếp sản phẩm cho phòng bán hàng.",
      "Phân tích định vị sản phẩm theo thương hiệu, phân khúc, cung cấp các thông tin chính sách bán hàng cạnh tranh.",
      "Biên soạn tài liệu so sánh sản phẩm, bán hàng, Marketing theo thương hiệu",
      "Tham gia biên soạn và cập nhật Bộ tài liệu đào tạo sản phẩm, Bộ sales-talk, Bộ tài liệu sản phẩm phục vụ bán hàng theo thương hiệu.",
      "Ghi nhận các thông tin về chất lượng sản phẩm, đề xuất nâng cấp phát triển sản phẩm.",
      "Triển khai đào tạo kiến thức sản phẩm, bán hàng, Marketing cho NSBH tại các Showroom. Tổ chức kiểm tra đánh giá sau đào tạo và đánh giá định kỳ.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-13",
    "order": 13,
    "slide": 27,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "TN Marketing",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm định hướng, triển khai và kiểm soát các hoạt động Marketing thương hiệu, Marketing bán hàng. Xây dựng và triển khai kế hoạch Marketing thương hiệu, Marketing bán hàng và Digital Marketing. Biên soạn các tài liệu hướng dẫn hoạt động Marketing thương hiệu, Marketing bán hàng và Digital Marketing.",
      "Lập và quản trị kế hoạch, ngân sách Marketing, đánh giá hiệu quả các chiến dịch Marketing/ CSKH; Kiểm soát hiệu quả Marketing bán hàng tại Đơn vị.",
      "Triển khai các giải pháp Marketing bán hàng mới theo xu hướng; Phân tích, đề xuất giải pháp gia tăng hiệu quả Marketing trực tuyến.",
      "Định hướng, triển khai và kiểm soát các hoạt động chăm sóc khách hàng.",
      "Quản trị hoạt động Marketing bán hàng theo vùng thị trường, theo đối tượng khách hàng mục tiêu theo định hướng từ VPĐH.",
      "Biên soạn tài liệu và xây dựng hoạt động đào tạo các kỹ năng Marketing bán hàng và Digital Marketing cho NSBH tại Đơn vị.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-14",
    "order": 14,
    "slide": 27,
    "deptCode": "KDX",
    "deptName": "Kinh doanh Xe (VP Công ty)",
    "category": "Kinh doanh",
    "title": "CV Maketing theo thương hiệu",
    "tier": 4,
    "duties": [
      "triển khai và kiểm soát các hoạt động MKT thương hiệu, MKT bán hàng tại các Showroom đúng theo theo định hướng từ VPĐH. Tham gia xây dựng và triển khai kế hoạch MKT. Tham gia biên soạn các tài liệu hướng dẫn hoạt động MKT cho NSBH các Showroom",
      "Xây dựng và triển khai các hoạt động Marketing theo thương hiệu, phân khúc, sản phẩm theo định hướng từ VPĐH.",
      "Hướng dẫn, triển khai và kiểm soát hoạt động Marketing trực tiếp tại các Showroom.",
      "Quản trị hoạt động Marketing bán hàng theo vùng thị trường, theo đối tượng khách hàng mục tiêu theo định hướng của thương hiệu từ VPĐH.",
      "Xây dựng kế hoạch, ngân sách và tổ chức kiểm soát Marketing bán hàng tại Đơn vị.",
      "Tham gia biên soạn và hoạt động đào tạo các kỹ năng Marketing bán hàng và Digital Marketing cho NSBH tại Đơn vị.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-15",
    "order": 15,
    "slide": 28,
    "deptCode": "QSD",
    "deptName": "Kinh doanh Xe Du lịch đã QSD",
    "category": "Kinh doanh",
    "title": "TP KD xe DL đã QSD",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tổ chức, kiểm soát và cải tiến hoạt động KD xe đã QSD bổ trợ cho hoạt động kinh doanh xe mới thông qua chương trình “Thu cũ – đổi mới” tại Công ty và các Showroom.",
      "Chịu trách nhiệm về chỉ tiêu Kinh doanh (Doanh số xe DL đã QSD (mua vào, bán ra)), chỉ tiêu tài chính (Doanh thu HH còn lại, chi phí kinh doanh xe DL đã QSD)",
      "Quản trị thông tin thị trường (Đối thủ, các yếu tố ảnh hưởng đến hoạt động KD xe đã QSD); Đề xuất các chính sách thúc đẩy Kinh doanh (CTBH, TNS cho NSBH…).",
      "Thực hiện đề xuất giá Mua vào – Bán ra và kiểm soát hoạt động thẩm định tại Đơn vị.",
      "Lập kế hoạch Marketing theo tháng/quý và trình Ban lãnh đạo Đơn vị phê duyệt.",
      "Triển khai & kiểm soát tuân thủ quy định, quy trình về hoạt động KD xe đã QSD tại các Showroom. Quản trị hoạt động kinh doanh hạn chế rủi ro phát sinh.",
      "Lập kế hoạch, chịu trách nhiệm kiểm soát thực hiện theo kế hoạch và quản trị tồn kho tại Đơn vị.",
      "Quản trị bộ hướng dẫn thẩm định, quản trị chi phí Marketing và nội dung truyền thông đối với xe đã QSD tại Đơn vị.",
      "Tổ chức đào tạo cho NSBH tại các Showroom về quy trình, hướng dẫn sử dụng bộ thẩm định và các nghiệp vụ KD xe đã QSD.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-16",
    "order": 16,
    "slide": 28,
    "deptCode": "QSD",
    "deptName": "Kinh doanh Xe Du lịch đã QSD",
    "category": "Kinh doanh",
    "title": "CV Kế hoạch kinh doanh xe DL đã QSD",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm quản trị thông tin thị trường, cơ sở dữ liệu. Kiểm soát thực hiện kế hoạch kinh doanh tại các Showroom.",
      "Phân tích thông tin thị trường và đề xuất chính sách KD xe DL đã QSD (CTBH, TNS cho NSBH…).",
      "Lập kế hoạch chỉ tiêu (chỉ tiêu mua, chỉ tiêu bán) theo tháng/quý/năm và kiểm soát thực hiện theo kế hoạch tại các Showroom.",
      "Kiểm soát tính tuân thủ thực hiện các Quy trình - Quy định, văn bản, biểu mẫu quản trị hoạt động KD xe đã QSD.",
      "Theo dõi, đánh giá và báo cáo thực hiện chỉ tiêu kinh doanh định kỳ hoặc theo chỉ đạo của BLĐ.",
      "Tham gia tổ chức đào tạo cho NSBH tại các Showroom về quy trình và các nghiệp vụ KD xe đã QSD.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-17",
    "order": 17,
    "slide": 28,
    "deptCode": "QSD",
    "deptName": "Kinh doanh Xe Du lịch đã QSD",
    "category": "Kinh doanh",
    "title": "CV Sản phẩm & Marketing xe DL đã QSD",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm cập nhật thông tin thị trường, biên soạn tài liệu sản phẩm phục vụ cho hoạt động KD xe đã QSD; Lập kế hoạch và quản trị các hoạt động Marketing phục vụ cho hoạt động KD xe đã QSD tại Công ty và các Showroom.",
      "Cập nhật thông tin thị trường (sản phẩm mới của đối thủ cạnh tranh trực tiếp; giá mua vào, bán ra của đơn vị kinh doanh xe đã QSD bên ngoài…) để phục vụ công tác thẩm định.",
      "Cập nhật Bộ Tài liệu sản phẩm xe đã QSD (TSKT, giá bán) tương ứng theo thương hiệu, mẫu xe, đời xe để phục vụ công tác định giá.",
      "Cập nhật và quản lý tài liệu hướng dẫn thẩm định.",
      "Lập kế hoạch Marketing theo quý và trình BLĐ Đơn vị phê duyệt.",
      "Biên soạn và đề xuất nội dung truyền thông trong hoạt động KD xe đã QSD để triển khai áp dụng tại các Showroom.",
      "Cung cấp nội dung, hình ảnh xe đã qua sử dụng cho nhân sự bán hàng tại các Showroom thực hiện giới thiệu đến khách hàng.",
      "Triển khai và Kiểm soát tính tuân thủ trong hoạt động Marketing và nhận diện KD xe đã QSD theo định hướng tại các Showroom.",
      "Tuân thủ nhập liệu thông tin khách hàng được phân bổ từ các kênh phát sinh.",
      "Tham gia tổ chức đào tạo cho NSBH tại các Showroom về hướng dẫn sử dụng bộ thẩm định và Marketing bán hàng xe đã QSD.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-18",
    "order": 18,
    "slide": 29,
    "deptCode": "SR_KD",
    "deptName": "Bán hàng Xe - Showroom",
    "category": "Showroom",
    "title": "GĐ Bán hàng nhóm xe/ nhóm thương hiệu",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu số lượng xe XHĐ và chỉ số hoạt động kinh doanh xe theo thương hiệu của Showroom, thị phần (theo phân khúc, thương hiệu), chỉ số hài lòng của khách hàng, doanh số xe DL đã QSD tại địa bàn quản lý.",
      "Quản lý thông tin thị trường, các sản phẩm, đối thủ cạnh tranh.",
      "Chịu trách nhiệm về chỉ tiêu doanh số xe, thị phần (theo phân khúc, thương hiệu), doanh thu HH còn lại, chi phí bán hàng, chỉ số hài lòng khách hàng và doanh số xe DL đã QSD.",
      "Triển khai và kiểm soát công tác đặt hàng, bán hàng và quản lý hàng tồn theo thương hiệu, sản phẩm.",
      "Quản trị hoạt động bán hàng theo thương hiệu tại Công ty tuân thủ QĐ-QT.",
      "Quản trị chi phí bán hàng, Marketing.",
      "Quản lý dữ liệu khách hàng, triển khai hoạt động chăm sóc khách hàng theo thương hiệu, phân khúc. Chịu trách nhiệm về chỉ số hài lòng khách hàng.",
      "Kiểm soát định biên, năng suất bán hàng và chịu trách nhiệm đào tạo Bán hàng, Sản phẩm & Marketing cho NSBH.",
      "Tổ chức kiểm soát công tác nhập liệu trên các phần mềm/ƯD CNTT của NSBH.",
      "Tổ chức đào tạo kiến thức, kỹ năng nhân sự bán hàng theo thương hiệu. Phát triển NSBH tiềm năng.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-19",
    "order": 19,
    "slide": 29,
    "deptCode": "SR_KD",
    "deptName": "Bán hàng Xe - Showroom",
    "category": "Showroom",
    "title": "TP Bán hàng",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu số lượng xe XHĐ và các chỉ số hoạt động kinh doanh xe của Phòng BH theo nhóm xe/ thương hiệu/ nhóm thương hiệu được giao quản lý.",
      "Chịu trách nhiệm về chỉ tiêu doanh số xe, các chỉ số hoạt động kinh doanh xe (KHQT, GDTD, KHĐ, Giao xe và các chỉ số khác do thương hiệu/THACO AUTO QĐ từng thời điểm), chỉ số hài lòng khách hàng và doanh số xe DL đã QSD.",
      "Quản lý thông tin thị trường, các sản phẩm, đối thủ cạnh tranh, tổ chức khai thác thị trường, đảm bảo mục tiêu thị phần theo thương hiệu tại địa bàn quản lý.",
      "Thực hiện và kiểm soát đặt hàng, bán hàng; quản lý hàng tồn.",
      "Giám sát chất lượng xe trưng bày tại Showroom, đảm bảo đúng QĐ trưng bày.",
      "Quản trị hoạt động của Phòng bán hàng theo thương hiệu tuân thủ QĐ-QT.",
      "Quản lý dữ liệu khách hàng, triển khai hoạt động chăm sóc khách hàng đảm bảo các chỉ số hài lòng khách hàng theo thương hiệu.",
      "Đào tạo kiến thức, kỹ năng nhân sự bán hàng. Chịu trách nhiệm kiểm tra, đào tạo Bán hàng, Sản phẩm & Marketing cho NSBH.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-20",
    "order": 20,
    "slide": 30,
    "deptCode": "SR_KD",
    "deptName": "Bán hàng Xe - Showroom",
    "category": "Showroom",
    "title": "TN Bán hàng",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu số lượng xe XHĐ và các các chỉ số hoạt động kinh doanh xe của nhóm BH nhóm xe/ nhóm thương hiệu/ thương hiệu được giao quản lý.",
      "Chịu trách nhiệm chỉ tiêu số doanh số xe và chỉ số hoạt động kinh doanh xe của cá nhân, nhóm (KHQT, GDTD, KHĐ, Giao xe và các chỉ số khác do thương hiệu/THACO AUTO QĐ từng thời điểm), chỉ số hài lòng và doanh số xe DL đã QSD.",
      "Thực hiện công tác chăm sóc khách hàng quan tâm xe, quản lý dữ liệu khách hàng, sự hài lòng khách hàng theo thương hiệu.",
      "Tuân thủ thực hiện Quy định, Quy trình bán hàng, Marketing và kiểm soát công tác nhập liệu phần mềm của TVBH.",
      "Chịu trách nhiệm đào tạo, hỗ trợ đàm phán khách hàng cho nhân sự bán hàng trong nhóm.",
      "Tham gia đầy đủ các khóa đào tạo do nội bộ tổ chức.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-21",
    "order": 21,
    "slide": 30,
    "deptCode": "SR_KD",
    "deptName": "Bán hàng Xe - Showroom",
    "category": "Showroom",
    "title": "Tư vấn Bán hàng",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu số lượng xe XHĐ và các các chỉ số hoạt động kinh doanh xe của cá nhân.",
      "Chịu trách nhiệm chỉ tiêu số doanh số xe và chỉ số hoạt động kinh doanh xe của cá nhân (KHQT, GDTD, KHĐ, Giao xe và các chỉ số khác do thương hiệu/THACO AUTO QĐ từng thời điểm), chỉ số hài lòng và doanh số xe DL đã QSD.",
      "Thực hiện công tác chăm sóc khách hàng quan tâm xe.",
      "Tuân thủ thực hiện Quy định, Quy trình bán hàng, Marketing và công tác nhập liệu phần mềm.",
      "Tham gia đầy đủ các khóa đào tạo do nội bộ tổ chức.",
      "Tự đào tạo, nâng cấp các kỹ năng bán hàng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-22",
    "order": 22,
    "slide": 31,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "GĐ KD DVPT xe Du lịch/ Tải, Bus",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm quản trị, điều hành, kiểm soát và chịu trách nhiệm hoạt động KD DVPT tại Công ty và các Điểm xưởng.",
      "Chịu trách nhiệm về chỉ tiêu kinh doanh (Doanh thu DVPT), chỉ tiêu tài chính (Doanh thu HH còn lại, chi phí kinh doanh DVPT) & chất lượng dịch vụ sau bán hàng của Công ty, các Điểm xưởng.",
      "Điều hành nghiệp vụ KD DVPT của Công ty (KHKD; Layout, thiết bị & QLVH xưởng; Kỹ thuật & công nghệ sửa chữa).",
      "Chịu trách nhiệm về chỉ tiêu Lượt xe, Doanh thu DVPT, Doanh thu DVSC, Doanh thu PT-VT, chỉ số hài lòng khách hàng và chi phí bán hàng DVPT.",
      "Quản lý và kiểm soát chính sách DVPT, hoạt động bán hàng - đặt hàng - tồn kho PT-VT.",
      "Kiểm soát chi phí KD DVPT (Chi phí đích danh, chi phí phân bổ).",
      "Chịu trách nhiệm về quản trị năng suất theo từng thành phần NS; Nguyên tắc tổ chức, tuyển dụng kiện toàn nhân sự.",
      "Đào tạo về Sản phẩm, Bán hàng & Marketing cho các thành phần nhân sự KD DVPT. Phát triển nhân sự tiềm năng.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-23",
    "order": 23,
    "slide": 31,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "TP KD DVPT xe Du lịch/ Tải, Bus",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tổ chức quản trị hoạt động Kinh doanh DVPT theo nhóm sản phẩm tại Công ty và các Điểm xưởng.",
      "Chịu trách nhiệm về chỉ tiêu: Lượt xe, Doanh thu DVPT",
      "Quản lý và kiểm soát chính sách KD DVPT, hoạt động bán hàng - đặt hàng - tồn kho PT-VT.",
      "Quản trị thực hiện chỉ tiêu kinh doanh DVPT theo nhóm sản phẩm phụ trách và xây dựng chính sách hỗ trợ thực hiện chỉ tiêu.",
      "Kiểm soát chi phí KD DVPT theo thương hiệu (Bán hàng, Marketing).",
      "Chịu trách nhiệm về quản trị năng suất của TVDV; Nguyên tắc tổ chức, tuyển dụng kiện toàn nhân sự.",
      "Đào tạo về Sản phẩm, Bán hàng & Marketing cho các thành phần nhân sự KD DVPT theo nhóm sản phẩm phụ trách.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-24",
    "order": 24,
    "slide": 31,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "TP KD DVPT Nhóm TH BMW/ Nhóm xe Stellantis/ Nhóm xe Kia, Mazda/ Xe Tải/ Xe Bus, Mini Bus",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tổ chức điều hành hoạt động Kinh doanh DVPT theo nhóm xe/ nhóm thương hiệu/ thương hiệu tại Công ty và các Điểm xưởng.",
      "Chịu trách nhiệm về chỉ tiêu: Lượt xe, Doanh thu DVPT theo nhóm xe/ nhóm thương hiệu/ thương hiệu được giao phụ trách.",
      "Tổ chức phân tích dữ liệu, đánh giá, nhận định thị trường và xây dựng chính sách kinh doanh DVPT theo nhóm xe/ nhóm thương hiệu/ thương hiệu phụ trách.",
      "Tổ chức xây dựng, soát xét, duyệt chỉ tiêu kinh doanh DVPT theo thương hiệu cho từng Showroom.",
      "Kiểm soát chi phí KD DVPT theo thương hiệu (Bán hàng, Marketing).",
      "Quản trị thực hiện chỉ tiêu kinh doanh DVPT theo nhóm xe/ nhóm thương hiệu/ thương hiệu phụ trách và đề xuất giải pháp thực hiện chỉ tiêu.",
      "Tham gia đào tạo về các Sản phẩm, Bán hàng & Marketing theo nhóm xe/ nhóm thương hiệu/ thương hiệu phụ trách cho các thành phần nhân sự KD DVPT.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-25",
    "order": 25,
    "slide": 32,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "TN Kế hoạch kinh doanh",
    "tier": 3,
    "duties": [
      "Khảo sát thị trường, nhu cầu khách hàng. Xây dựng, phân giao chỉ tiêu KD, quản trị thực hiện chỉ tiêu.",
      "Quản lý và kiểm soát thực hiện kế hoạch KD DVPT, hoạt động bán hàng - đặt hàng - tồn kho PT-VT.",
      "Quản lý hoạt động nghiệp vụ bảo hành bảo dưỡng theo phân cấp.",
      "Quản lý PT-VT tồn kho, phụ tùng nợ. Quản lý hoạt động đặt hàng, điều phối cung cấp PT-VT cho các Showroom.",
      "Triển khai các chính sách, chương trình bán hàng, marketing DVPT và chăm sóc khách hàng cho các nhân sự liên quan.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-26",
    "order": 26,
    "slide": 32,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Thị trường, chính sách, KHBH",
    "tier": 4,
    "duties": [
      "Phân tích dữ liệu các chỉ số KPI dịch vụ trong hoạt động kinh doanh dịch vụ. Tổng hợp, phân tích thông tin thị trường, nhu cầu khách hàng, hãng cạnh tranh.",
      "Tổng hợp bộ kế hoạch KD và theo dõi thực hiện chỉ tiêu KD dịch vụ theo từng thương hiệu, loại hình sửa chữa, điểm xưởng hằng ngày/ tuần/ tháng.",
      "Tổng hợp, đánh giá hiệu quả các chương trình xúc tiến dịch vụ.",
      "Quản lý, cập nhật thông tin dữ liệu khách hàng (UIO) theo từng mẫu xe, theo từng vùng thị trường.",
      "Kiểm soát & hướng dẫn thực hiện các chính sách, quy trình, quy định.",
      "Tham gia triển khai các chính sách bán hàng DVPT cho các nhân sự liên quan.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-27",
    "order": 27,
    "slide": 32,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Sản phẩm dịch vụ",
    "tier": 4,
    "duties": [
      "Hỗ trợ nhân sự TVDV trong công tác tư vấn kỹ thuật sản phẩm, tư vấn các gói SP DVPT theo yêu cầu khách hàng.",
      "Chịu trách nhiệm biên soạn và nội dung của bộ tài liệu sản phẩm phục vụ bán hàng, Marketing và đào tạo.",
      "Quản trị thị trường DV, CTBH và các sản phẩm dịch vụ của đối thủ cạnh tranh, nhu cầu khách hàng DV tại địa bàn quản lý theo nhóm thương hiệu phụ trách.",
      "Quản trị tính năng, option và các trang bị của sản phẩm. Kiểm soát chất lượng các gói sản phẩm dịch vụ.",
      "Quản trị thông tin phản hồi của khách hàng về chất lượng sản phẩm.",
      "Quản trị bộ tài liệu sản phẩm bán hàng và Marketing.",
      "Tổ chức đào tạo sản phẩm DVPT và kiểm tra đánh giá sau đào tạo.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-28",
    "order": 28,
    "slide": 32,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Marketing & CRM",
    "tier": 4,
    "duties": [
      "Đề xuất kế hoạch, triển khai thực hiện các hoạt động Marketing bán hàng DV theo thương hiệu, theo định hướng từ VPĐH: truyền thông, Marketing giới thiệu các gói dịch vụ, hướng dẫn sử dụng & chăm sóc xe, sáng tạo nội dung Marketing dịch vụ trên các kênh trực tuyến/công cụ Marketing.",
      "Kiểm soát triển khai hoạt động Marketing bán hàng dịch vụ của các Showroom.",
      "Lập kế hoạch và tổ chức triển khai hoạt động Marketing các chương trình CSKH, xúc tiến bán hàng DVPT. Triển khai quy định, quy trình về Marketing DVPT, chi phí Marketing.",
      "Kiểm soát nội dung, phát triển các công cụ truyền thông và Digital Marketing.",
      "Tổ chức đánh giá, đào tạo cải thiện, nâng cao chất lượng chăm sóc khách hàng.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-29",
    "order": 29,
    "slide": 32,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV ĐH - ĐP & QL tồn kho",
    "tier": 4,
    "duties": [
      "Theo dõi dữ liệu nhập, xuất, tồn PT-VT (cập nhật và quản lý dữ liệu báo cáo cho LĐ). Thực hiện đặt hàng, theo dõi chỉ tiêu bán hàng theo từng thương hiệu/ nhóm thương hiệu. Quản trị đặt hàng, tồn kho PT-VT.",
      "Quản lý Bộ dữ liệu thị trường PT-VT, đánh giá cạnh tranh đối thủ, xây dựng chỉ tiêu KD PT-VT theo thương hiệu/ nhóm thương hiệu (được ban hành từ THACO AUTO & nội bộ ĐV).",
      "Quản trị Bộ dữ liệu chính sách BH PT-VT theo SP, thương hiệu (được ban hành từ THACO AUTO & nội bộ ĐV); Thực hiện các tờ trình liên quan đến chính sách.",
      "Tham gia các chương trình đào tạo về nghiệp vụ đặt hàng, quản lý Kho PT-VT.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-30",
    "order": 30,
    "slide": 33,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "TN Layout, thiết bị & QL Vận hành xưởng",
    "tier": 3,
    "duties": [
      "Kiểm soát tuân thủ thực hiện quy trình, quy định vận hành theo layout công năng và đánh giá định kỳ để cải thiện hoạt động xưởng, kho PT-VT.",
      "Tổ chức thực hiện các giải pháp vận hành nâng cao công suất xưởng & năng suất lao động.",
      "Lập danh mục, chủng loại TB-CCDC đầu tư phù hợp và hiệu quả.",
      "Rà soát, kiểm kê, báo cáo định kỳ thực trạng CCDC. Đề xuất phương án điều chuyển, nâng cấp, bổ sung hoặc thanh lý. Thực hiện công tác duy tu, bảo trì TB-CCDC.",
      "Kiểm soát quy trình đầu tư TB-CCDC theo thương hiệu, quy định duy tu bảo trì tại Đơn vị.",
      "Chịu trách nhiệm tổ chức các chương trình đào tạo quản lý vận hành xưởng, kho PT-VT cho nhân sự tại Đơn vị.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-31",
    "order": 31,
    "slide": 33,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Layout & QL Vận hành Xưởng",
    "tier": 4,
    "duties": [
      "Ban hành tài liệu nội bộ quản lý vận hành layout công năng, TB-CCDC theo mô hình từng xưởng.",
      "Đề xuất nâng cấp, cải tạo layout công năng và cập nhật quy định vận hành từng điểm xưởng.",
      "Quản trị hiệu suất khoang, năng suất sửa chữa.",
      "Triển khai ứng dụng số vào quản trị năng suất nhân sự, năng suất khoang sửa chữa.",
      "Tham gia tổ chức các chương trình đào tạo quản lý vận hành xưởng, kho PT-VT cho nhân sự tại Đơn vị.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-32",
    "order": 32,
    "slide": 33,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Thiết bị, CCDC",
    "tier": 4,
    "duties": [
      "Ban hành tài liệu nội bộ quản lý TB-CCDC theo mô hình từng xưởng.",
      "Quản trị hiệu quả đầu tư sử dụng, đề xuất điều chuyển TB-CCDC giữa các điểm xưởng.",
      "Thực hiện kiểm soát công tác duy tu bảo trì TB-CCDC tại từng xưởng theo quy định.",
      "Tham gia tổ chức các chương trình đào tạo quản lý, sử dụng thiết bị, CCDC cho nhân sự tại Đơn vị.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-33",
    "order": 33,
    "slide": 34,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "TN Kỹ thuật & công nghệ sửa chữa",
    "tier": 3,
    "duties": [
      "Triển khai bản tin kỹ thuật và tài liệu hướng dẫn sửa chữa.",
      "Tổ chức hỗ trợ kỹ thuật trực tiếp những trường hợp khó.",
      "Kiểm soát chất lượng xe mới (PDI/PDS) theo quy định, quy trình.",
      "Quản lý, kiểm soát chất lượng xe mới lưu kho theo định kỳ.",
      "Quản trị hoạt động kỹ thuật & công nghệ sửa chữa theo QĐ-QT và chính sách.",
      "Quản trị dữ liệu; đề xuất giải pháp cải tiến.",
      "Triển khai đánh giá tay nghề chuyên môn KTV theo ngạch bậc, lập kế hoạch đào tạo về kỹ thuật, các giải pháp sửa chữa cho đội ngũ KTV.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, kiến thức chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-34",
    "order": 34,
    "slide": 34,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Kỹ thuật & công nghệ sửa chữa Máy gầm",
    "tier": 4,
    "duties": [
      "Hỗ trợ kỹ thuật sửa chữa trực tiếp những trường hợp khó.",
      "Tham gia nghiên cứu các giải pháp sửa chữa máy gầm.",
      "Đề xuất cải tiến giải pháp, cập nhật tài liệu sửa chữa.",
      "Tham gia đánh giá tay nghề chuyên môn KTV.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, tay nghề chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-35",
    "order": 35,
    "slide": 34,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Kỹ thuật & công nghệ sửa chữa Điện – Điện tử, HT thông minh",
    "tier": 4,
    "duties": [
      "Hỗ trợ kỹ thuật sửa chữa trực tiếp những trường hợp khó.",
      "Tham gia nghiên cứu các giải pháp sửa chữa hệ thống điện – điện tử, hệ thống thông minh.",
      "Đề xuất cải tiến giải pháp, cập nhật tài liệu sửa chữa.",
      "Tham gia đánh giá tay nghề chuyên môn KTV.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, tay nghề chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-36",
    "order": 36,
    "slide": 34,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Kỹ thuật & công nghệ sửa chữa Đồng Sơn",
    "tier": 4,
    "duties": [
      "Hỗ trợ kỹ thuật sửa chữa trực tiếp những trường hợp khó.",
      "Tham gia nghiên cứu các giải pháp sửa chữa Đồng Sơn.",
      "Đề xuất cải tiến giải pháp, cập nhật tài liệu sửa chữa.",
      "Tham gia đánh giá tay nghề chuyên môn KTV.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, tay nghề chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-37",
    "order": 37,
    "slide": 34,
    "deptCode": "DVPT",
    "deptName": "Kinh doanh Dịch vụ Phụ tùng (VP Công ty)",
    "category": "Dịch vụ",
    "title": "CV Kỹ thuật bảo hành",
    "tier": 4,
    "duties": [
      "Triển khai chính sách bảo dưỡng, bảo hành; Quy định hoạt động kỹ thuật bảo hành.",
      "Thực hiện xét duyệt bảo hành theo phân cấp và yêu cầu thanh toán chi phí.",
      "Đề xuất cải tiến giải pháp, cập nhật tài liệu sửa chữa.",
      "Tham gia đánh giá tay nghề chuyên môn KTV.",
      "Tự đào tạo, tham gia nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-38",
    "order": 38,
    "slide": 35,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "GĐ/ PGĐ DVPT xe Du lịch/ Tải, Bus",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm quản trị hoạt động DVPT và chỉ tiêu KD DVPT tại Điểm Xưởng quản lý: Lượt xe, Doanh thu DVPT, Doanh thu PT-VT, Doanh thu DVSC, Chỉ số hài lòng khách hàng và chi phí bán hàng DVPT.",
      "Quản lý thị trường Dịch vụ, tỷ lệ lượt xe vào xưởng, UIO tại địa bàn quản lý.",
      "Quản lý và chịu trách nhiệm tồn kho Phụ tùng - Vật tư tại xưởng.",
      "Quản trị chất lượng sửa chữa tại xưởng.",
      "Quản lý & kiểm soát hoạt động DVPT tại xưởng tuân thủ theo QĐ-QT khung từ THACO AUTO.",
      "Chịu trách nhiệm lập, triển khai và kiểm soát kế hoạch hoạt động tại xưởng; Tổ chức giao và kiểm soát thực hiện chỉ tiêu đến từng cá nhân tại xưởng.",
      "Quản trị chi phí hoạt động DVPT tại xưởng.",
      "Kiểm soát định biên, năng suất và chịu trách nhiệm đào tạo chuyên môn cho nhân sự DVPT.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-39",
    "order": 39,
    "slide": 35,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "TP Bán hàng DVPT",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm quản trị hoạt động bán hàng DVPT và chỉ tiêu bán hàng DVPT theo thương hiệu/ loại hình sửa chữa: Lượt xe, Doanh thu DVPT và chỉ số hài lòng khách hàng.",
      "Quản lý thị trường DV, tỷ lệ lượt xe vào xưởng, UIO theo thương hiệu; Quản trị chỉ số doanh thu bình quân/lượt xe.",
      "Quản lý dữ liệu khách hàng, chịu trách nhiệm về chỉ số hài lòng khách hàng theo thương hiệu phụ trách.",
      "Kiểm soát năng suất TVDV.",
      "Tổ chức giao và kiểm soát thực hiện chỉ tiêu bán hàng dịch vụ cho các nhóm và nhân sự TVDV (chỉ tiêu doanh thu, lượt xe).",
      "Quản trị hoạt động bán hàng DVPT tuân thủ QĐ-QT, chính sách.",
      "Phối hợp, tham gia xử lý các khiếu nại có phát sinh liên quan DVPT tại xưởng.",
      "Chịu trách nhiệm đào tạo sản phẩm, bán hàng & Marketing cho nhân sự TVDV, đảm bảo tỷ lệ đạt chứng chỉ TVDV theo yêu cầu thương hiệu.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-40",
    "order": 40,
    "slide": 35,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "TN Bán hàng dịch vụ",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu bán hàng Dịch vụ của nhóm và cá nhân: Lượt xe, Doanh thu DVPT và chỉ số hài lòng khách hàng.",
      "Thực hiện hoạt động CSKH sửa chữa, làm dịch vụ tại xưởng và quản lý thông tin khách hàng.",
      "Theo dõi, kiểm soát nhập liệu thông tin khách hàng trên các phần mềm/ƯD CNTT.",
      "Theo dõi, kiểm soát thực hiện chỉ tiêu của các TVDV trong nhóm.",
      "Kiểm soát và tuân thủ các Quy định, quy trình hoạt động Dịch vụ theo thương hiệu/ sản phẩm.",
      "Đào tạo, hướng dẫn kỹ năng tư vấn bán hàng cho TVDV.",
      "Tự đào tạo, nâng cấp các kỹ năng bán hàng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-41",
    "order": 41,
    "slide": 35,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "CV Tư vấn dịch vụ",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm chỉ tiêu bán hàng Dịch vụ của cá nhân: Lượt xe, Doanh thu DVPT và chỉ số hài lòng khách hàng",
      "Thực hiện hoạt động CSKH sửa chữa, làm dịch vụ tại xưởng và quản lý thông tin khách hàng cá nhân.",
      "Tuân thủ các Quy định, quy trình hoạt động Dịch vụ theo thương hiệu/ sản phẩm.",
      "Tự đào tạo, nâng cấp các kỹ năng bán hàng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-42",
    "order": 42,
    "slide": 36,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "TN Bán hàng Phụ tùng - Vật tư",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm quản trị hoạt động bán hàng PT-VT, chỉ tiêu bán hàng PT-VT (Doanh thu bán PT-VT qua Xưởng, bán lẻ; Doanh số mua PT-VT; Doanh thu HH PT-VT) tại đơn vị và chỉ số hài lòng khách hàng.",
      "Quản lý thị trường, khách hàng; Lập kế hoạch, triển khai và kiểm soát thực hiện kế hoạch hoạt động bán hàng PT-VT. Tổ chức giao và kiểm soát thực hiện chỉ tiêu bán hàng PT-VT cho các nhóm và từng nhân sự.",
      "Đặt hàng, bán hàng và tồn kho, hệ số dự trữ Phụ tùng - Vật tư.",
      "Kiểm soát giá bán, chính sách bán hàng PT-VT theo quy định.",
      "Quản trị hoạt động bán hàng tuân thủ QĐ-QT.",
      "Chịu trách nhiệm đào tạo chuyên môn cho nhân sự bán hàng PT-VT.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-43",
    "order": 43,
    "slide": 36,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "CV/NV Bán hàng Phụ tùng - Vật tư",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm về chỉ tiêu bán hàng Phụ tùng/ vật tư theo thương hiệu (Doanh thu bán PT-VT qua Xưởng/ bán lẻ), chỉ số hài lòng khách hàng.",
      "Thực hiện đặt mua hàng, bán hàng và tồn kho, khả năng cung ứng Phụ tùng - vật tư đáp ứng kế hoạch kinh doanh.",
      "Quản lý thông tin thị trường, khách hàng; triển khai bán hàng đảm bảo tuân thủ theo quy định và chính sách tại Đơn vị.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-44",
    "order": 44,
    "slide": 36,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "NV Kho PT-VT",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm cấp phát phụ tùng – vật tư tới từng khoang sửa chữa theo yêu cầu LSC, tuân thủ theo Quy định, quy trình.",
      "Thực hiện gia công ngoài Phụ tùng khi có phát sinh, đảm bảo đúng Quy định.",
      "Bố trí sắp xếp kho theo quy định, đảm bảo vệ sinh 5S, ATLĐ và PCCN. Bảo quản phụ tùng vật tư định kỳ đảm bảo chất lượng PT-VT lưu kho.",
      "Tuân thủ Quy định về nhập-xuất-tồn phụ tùng-vật tư-phụ kiện.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-45",
    "order": 45,
    "slide": 37,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "QĐ Xưởng MGĐ/ Đồng Sơn",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm quản trị hoạt động sửa chữa. Tổ chức giao và kiểm soát thực hiện chỉ tiêu Doanh thu DVSC, lượt xe sửa chữa đến từng Tổ và từng KTV. Tổ chức vận hành hoạt động xưởng tuân thủ layout, công năng và Quy định-Quy trình.",
      "Chịu trách nhiệm về chỉ tiêu: Lượt xe, Doanh thu DVSC, chi phí hoạt động xưởng, chỉ số hài lòng khách hàng.",
      "Tổ chức giao và kiểm soát thực hiện chỉ tiêu Doanh thu DVSC, lượt xe sửa chữa đến từng Tổ và từng KTV. Tổ chức vận hành hoạt động xưởng tuân thủ layout, công năng và Quy định-Quy trình.",
      "Quản trị năng suất khoang sửa chữa, năng suất KTV và giá công sửa chữa MGĐ/ Đồng Sơn. Kiểm soát tiến độ, chất lượng sửa chữa và chỉ số hài lòng khách hàng về dịch vụ sửa chữa.",
      "Kiểm soát tuân thủ các quy định về ATLĐ, PCCN, 5S và Quản lý sử dụng thiết bị, CCDC tại xưởng.",
      "Phối hợp, tham gia xử lý các khiếu nại có phát sinh liên quan DVPT tại xưởng.",
      "Kiểm soát tay nghề KTV; Đánh giá & đào tạo năng lực chuyên môn, tay nghề KTV, đảm bảo đạt chứng chỉ theo tiêu chuẩn thương hiệu.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-46",
    "order": 46,
    "slide": 37,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "TT MGĐ/ Đồng sơn",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm về chỉ tiêu của Tổ sửa chữa và cá nhân, bao gồm: Lượt xe, Doanh thu DVSC và chỉ số hài lòng khách hàng.",
      "Tổ chức phân giao công việc phù hợp, quản lý và giám sát thực hiện đảm bảo chỉ tiêu của Tổ và từng KTV.",
      "Chịu trách nhiệm về tiến độ, chất lượng sửa chữa và chỉ số hài lòng khách hàng.",
      "Tuân thủ các quy định về ATLĐ, PCCN, 5S và Quản lý sử dụng, bảo quản thiết bị, CCDC tại xưởng.",
      "Chịu trách nhiệm về chất lượng các khóa đào tạo đạt theo yêu cầu và hướng dẫn, đào tạo trực tiếp tay nghề KTV.",
      "Tự đào tạo, nâng cấp các kỹ năng, quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-47",
    "order": 47,
    "slide": 37,
    "deptCode": "SR_DV",
    "deptName": "Dịch vụ Phụ tùng - Showroom",
    "category": "Showroom",
    "title": "KTV MGĐ/ Đồng Sơn",
    "tier": 1,
    "duties": [
      "Chịu trách nhiệm về chỉ tiêu cá nhân, bao gồm: Doanh thu DVSC, Lượt xe, Doanh thu DVSC và chỉ số hài lòng khách hàng.",
      "Thực hiện sửa chữa đảm bảo tiến độ, chất lượng sửa chữa và tuân thủ theo Quy định, quy trình tại Đơn vị.",
      "Tuân thủ các quy định về ATLĐ, PCCN, 5S và sử dụng, bảo quản thiết bị, CCDC tại xưởng.",
      "Chủ động học hỏi, trao dồi kiến thức tay nghề; chịu trách nhiệm về chất lượng các khóa đào tạo và đạt chứng chỉ theo yêu cầu."
    ]
  },
  {
    "id": "pos-48",
    "order": 48,
    "slide": 38,
    "deptCode": "QTCP",
    "deptName": "Quản trị Chi phí, Giá thành",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "TP Quản trị Chi phí, Giá thành",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tham mưu Ban lãnh đạo Công ty điều hành và quản trị nghiệp vụ quản trị chi phí giá thành, đầu mối kiểm soát cấu trúc giá thành tại Công ty.",
      "Xây dựng định mức chi phí nhân sự, bán hàng, Marketing, chi phí vận chuyển…theo từng mảng kinh doanh, theo từng thương hiệu (KD xe, DVPT).",
      "Phân tích hiệu quả chi phí (chi phí/ xe bán ra; Chi phí/ DT DVSC (lượt xe)).",
      "Kiểm soát chi phí vận hành Showroom và xưởng dịch vụ.",
      "Thiết lập chi phí mục tiêu cho từng Showroom, xưởng dịch vụ và theo nhóm Chi phí.",
      "Soạn quy trình tác nghiệp nội bộ chi phí giá thành tại Công ty.",
      "Kiến nghị giải pháp tối ưu chi phí từng khâu.",
      "Soát xét các báo cáo phân tích chi phí giá thành xe và DVPT cho TGĐ Công ty.",
      "Hướng dẫn, đào tạo nghiệp vụ chuyên môn về giá thành cho các nhân sự liên quan.",
      "Tự đào tạo, nâng cấp các kỹ năng quản trị, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-49",
    "order": 49,
    "slide": 38,
    "deptCode": "QTCP",
    "deptName": "Quản trị Chi phí, Giá thành",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Quản trị Chi phí, Giá thành xe",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thống kê, kiểm soát chi phí giá thành xe tại Công ty.",
      "Theo dõi thực tế chi phí bán hàng (giảm giá, hoa hồng, Marketing, vận chuyển).",
      "Tính chi phí/ xe bán ra.",
      "Quản lý chi phí điện – nước – nhân sự – vận hành.",
      "Kiểm soát tuân thủ nhập liệu chi phí giá thành xe trên phần mềm Tài chính – Kế toán.",
      "Lập các báo cáo chi phí ngày/ tuần/ tháng.",
      "Tham gia các khóa đào tạo chuyên môn nội bộ.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-50",
    "order": 50,
    "slide": 38,
    "deptCode": "QTCP",
    "deptName": "Quản trị Chi phí, Giá thành",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Quản trị Chi phí, Giá thành DVPT",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thống kê, kiểm soát chi phí giá thành DVPT tại Công ty.",
      "Theo dõi chi phí dịch vụ (phụ tùng, vật tư, nhân công).",
      "Quản lý chi phí điện – nước – nhân sự – vận hành.",
      "Tính chi phí/ RO dịch vụ.",
      "Đối chiếu dữ liệu vật tư trên phần mềm Tài chính – Kế toán",
      "Kiểm soát tuân thủ nhập liệu chi phí giá thành DVPT trên phần mềm Tài chính – Kế toán",
      "Lập các Báo cáo chi phí ngày/ tuần/ tháng.",
      "Tham gia các khóa đào tạo chuyên môn nội bộ.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-51",
    "order": 51,
    "slide": 39,
    "deptCode": "TCHĐ",
    "deptName": "Quản lý TCHĐ & Cơ sở vật chất",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "TP Tiêu chuẩn hoạt động, Cơ sở vật chất",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm Tổ chức quản lý và vận hành trực tiếp cơ sở vật chất Showroom/Xưởng tại Công ty THACO AUTO tỉnh thành; đảm bảo hoạt động ổn định, an toàn, hiệu quả và tuân thủ đầy đủ các tiêu chuẩn, quy định của THACO AUTO.",
      "Tổ chức triển khai, quản lý và kiểm soát việc tuân thủ các tiêu chuẩn, quy định, quy trình về CSVC và vận hành Showroom/Xưởng theo quy định hệ thống.",
      "Lập và tổ chức thực hiện kế hoạch quản lý, sử dụng, duy tu – bảo trì CSVC định kỳ và đột xuất.",
      "Quản lý công tác tiếp nhận, bàn giao và khai thác sử dụng CSVC tại các Showroom trực thuộc.",
      "Theo dõi, kiểm soát hiện trạng CSVC; Kịp thời đề xuất phương án sửa chữa, nâng cấp, cải tạo phục vụ hoạt động SXKD.",
      "Phối hợp với VPĐH và các phòng ban liên quan trong công tác đầu tư, nâng cấp, cải tạo CSVC.",
      "Đảm bảo tuân thủ quy định an toàn, PCCC, môi trường và các yêu cầu pháp lý liên quan.",
      "Phân công công việc, kiểm tra và đánh giá hiệu quả thực hiện của nhân sự thuộc bộ phận.",
      "Tổ chức giám sát hoạt động vận hành và DTBT tại đơn vị.",
      "Tổng hợp, báo cáo định kỳ/đột xuất tình hình CSVC và vận hành Showroom/Xưởng theo yêu cầu của VPĐH và Ban lãnh đạo Công ty.",
      "Kiểm soát chi phí vận hành và bảo trì đảm bảo tối ưu, hiệu quả.",
      "Phối hợp xử lý các sự cố, rủi ro phát sinh trong quá trình vận hành.",
      "Hướng dẫn nhân sự trong bộ phận thực hiện đúng quy trình quản lý CSVC và vận hành Showroom. Phổ biến tiêu chuẩn, quy định mới từ hệ thống. Nâng cao nhận thức về an toàn lao động, PCCC và bảo vệ tài sản. Đào tạo, phát triển nhân sự kế thừa trong công tác quản lý vận hành."
    ]
  },
  {
    "id": "pos-52",
    "order": 52,
    "slide": 39,
    "deptCode": "TCHĐ",
    "deptName": "Quản lý TCHĐ & Cơ sở vật chất",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Quản lý Tiêu chuẩn hoạt động",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai, kiểm soát và duy trì việc áp dụng Tiêu chuẩn hoạt động (TCHĐ) tại Showroom/Xưởng theo quy định hệ thống.",
      "Triển khai và kiểm soát việc áp dụng TCHĐ, nhận diện và quy định vận hành theo hướng dẫn VPĐH.",
      "Kiểm tra, đánh giá mức độ tuân thủ TCHĐ; Đề xuất biện pháp khắc phục và cải tiến.",
      "Phối hợp triển khai layout, hình ảnh nhận diện và các hạng mục liên quan theo tiêu chuẩn hệ thống.",
      "Tổng hợp các vấn đề phát sinh trong quá trình triển khai TCHĐ tại đơn vị.",
      "Lập báo cáo định kỳ/đột xuất về tình hình triển khai TCHĐ theo yêu cầu VPĐH và Ban lãnh đạo Công ty.",
      "Theo dõi tiến độ thực hiện các nội dung khắc phục sau kiểm tra, đánh giá.",
      "Quản lý, lưu trữ hồ sơ, tài liệu và hình ảnh liên quan công tác quả lý TCHĐ.",
      "Tham gia đào tạo và chủ động cập nhật kiến thức về TCHĐ, nhận diện và vận hành hệ thống. Hướng dẫn nội bộ thực hiện đúng các TCHĐ theo quy định."
    ]
  },
  {
    "id": "pos-53",
    "order": 53,
    "slide": 39,
    "deptCode": "TCHĐ",
    "deptName": "Quản lý TCHĐ & Cơ sở vật chất",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Quản lý Cơ sở vật chất & Duy tu bảo trì",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai, quản lý và kiểm soát công tác đầu tư xây dựng, vận hành và duy tu bảo trì CSVC tại Showroom/Xưởng theo quy định hệ thống; đảm bảo tiến độ, chất lượng, an toàn và hiệu quả vận hành.",
      "Phối hợp triển khai kế hoạch đầu tư, nâng cấp và cải tạo Showroom/xưởng.",
      "Theo dõi, kiểm soát tiến độ, chất lượng, chi phí dự án và công tác vận hành CSVC.",
      "Quản lý vận hành, bảo trì hệ thống kỹ thuật và hạng mục xây dựng.",
      "Kiểm tra tình trạng hệ thống, xử lý sự cố và đề xuất cải tiến vận hành.",
      "Phối hợp nghiệm thu, sửa chữa, bảo trì với các đơn vị liên quan.",
      "Cập nhật quy trình, tiêu chuẩn kỹ thuật và tham gia đào tạo chuyên môn.",
      "Báo cáo tình hình đầu tư, vận hành và DTBT theo yêu cầu VPĐH và Ban lãnh đạo Công ty.",
      "Theo dõi chi phí đầu tư, vận hành, bảo trì và hồ sơ dự án.",
      "Phối hợp kiểm tra, đánh giá hiệu quả quản lý CSVC tại đơn vị.",
      "Kiểm soát tuân thủ quy định ATLĐ, PCCC, môi trường và tiêu chuẩn hệ thống.",
      "Chủ động cập nhật kiến thức về đầu tư xây dựng, vận hành và bảo trì hệ thống kỹ thuật. Hướng dẫn nội bộ thực hiện đúng quy định và TCHĐ hệ thống."
    ]
  },
  {
    "id": "pos-54",
    "order": 54,
    "slide": 40,
    "deptCode": "QLCL",
    "deptName": "Quản lý Chất lượng, GNVC & Kho xe",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "TP Quản lý chất lượng, GNVC & Kho xe",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tổ chức và kiểm soát hoạt động QLCL, giao nhận vận chuyển tại Công ty, đảm bảo tuân thủ quy định, quy trình, vận hành hiệu quả và tối ưu.",
      "Triển khai, hướng dẫn và giám sát các Showroom/Đại lý tuân thủ thực hiện theo các QĐ, QT QLCL.",
      "Theo dõi, phân tích, báo cáo tình hình lỗi chất lượng, kiểm soát chi phí chất lượng và đề xuất cải tiến chất lượng sản phẩm.",
      "Kiểm soát bảo quản, bảo dưỡng xe lưu kho, trưng bày, cảnh báo ngăn ngừa rủi ro và chi phí Chất lượng tại các Showroom/Đại lý.",
      "Thực hiện quy hoạch kho xe; quy hoạch Layout công năng sử dụng kho tại Công ty/Showroom trực thuộc.",
      "Triển khai, kiểm soát tuân thủ các quy định, quy trình, tiêu chuẩn hoạt động Giao nhận vận chuyển, kho xe & lái xe.",
      "Kiểm soát đối tác tác vận chuyển (hợp đồng, cước phí, chất lượng dịch vụ,…) & phân tích, tham mưu lựa chọn đối tác, tuyến vận chuyển tối ưu.",
      "Quản lý & khai thác hiệu quả xe chuyên dụng.",
      "Kiểm soát chi phí hoạt động QLCL, giao nhận vận chuyển & kho xe tại Công ty/Showroom trực thuộc.",
      "Ứng dụng chuyển đổi số vào hoạt động QLCL, giao nhận chuyển & kho xe.",
      "Hướng dẫn, đào tạo phát triển nhân sự kế cận nghiệp vụ."
    ]
  },
  {
    "id": "pos-55",
    "order": 55,
    "slide": 40,
    "deptCode": "QLCL",
    "deptName": "Quản lý Chất lượng, GNVC & Kho xe",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Quản lý Chất lượng xe Du lịch/ Tải, Bus",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm kiểm soát hoạt động Quản lý chất lượng tại các Showroom trực thuộc.",
      "Hướng dẫn hoạt động Quản lý chất lượng tại các Showroom trực thuộc.",
      "Tổng hợp, báo cáo, phân tích các vấn đề chất lượng phát sinh tại các Showroom/Đại lý (chi phí, đề xuất giải pháp,…).",
      "Kiểm tra tuân thủ thực hiện quy định, tài liệu hoạt động QLCL tại các Showroom trực thuộc",
      "Phản hồi các kết quả phân tích và đề xuất các giải pháp cải tiến chất lượng sản phẩm, quy trình kiểm soát đến Trưởng phòng.",
      "Kiểm soát hoạt động quản lý chất lượng tại các Showroom (chi phí, đánh giá bất cập, đề xuất giải pháp).",
      "Ứng dụng chuyển đổi số vào hoạt động QLCL.",
      "Hỗ trợ hướng dẫn nghiệp vụ các Showroom/Đại lý."
    ]
  },
  {
    "id": "pos-56",
    "order": 56,
    "slide": 41,
    "deptCode": "QLCL",
    "deptName": "Quản lý Chất lượng, GNVC & Kho xe",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV QL GNVC",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm kiểm soát hoạt động Giao nhận vận chuyển tại các Showroom trực thuộc.",
      "Hướng dẫn hoạt động GNVC (đối tác, tuyến vận chuyển, cước phí,….theo Hợp đồng vận chuyển).",
      "Tổng hợp, báo cáo, phân tích chi phí GNVC xe tại các Showroom và làm việc với đối tác vận chuyển xử lý lỗi phát sinh trong quá trình vận chuyển xe thành phẩm.",
      "Kiểm tra tuân thủ thực hiện quy định, tài liệu hoạt động GNVC tại các Showroom trực thuộc (phương thức vận chuyển, an toàn chằn buộc hàng hóa,…).",
      "Kiểm soát hoạt động giao nhận vận chuyển tại các Showroom (chi phí, đánh giá bất cập, đề xuất giải pháp).",
      "Hướng dẫn nghiệp vụ Giao nhận vận chuyển tại các Showroom trực thuộc."
    ]
  },
  {
    "id": "pos-57",
    "order": 57,
    "slide": 41,
    "deptCode": "QLCL",
    "deptName": "Quản lý Chất lượng, GNVC & Kho xe",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV QL Kho xe, Lái xe",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm kiểm soát hoạt động kho xe & lái xe tại các Showroom trực thuộc.",
      "Hướng dẫn, kiểm tra thực hiện bảo quản, bảo dưỡng xe mới, xe công, xe lái thử (Demo), xe thay thế; xe Mobile Service, xe sửa chữa lưu động; xe chuyên dụng tại các Showroom trực thuộc.",
      "Tổng hợp, báo cáo, phân tích hoạt động kho xe & lái xe tại các Showroom (chi phí, bất cập, đề xuất giải pháp,…).",
      "Kiểm soát tồn kho, sức chứa kho xe tại từng Showroom.",
      "Kiểm tra tuân thủ sử dụng phần mềm quản trị hệ thống DDMS phân hệ GNVC & kho xe tại các Showroom.",
      "Kiểm tra tuân thủ 5S, an toàn phòng chống cháy nổ tại kho xe.",
      "Kiểm soát, phân tích chi phí hoạt động kho xe & lái xe tại Showroom trực thuộc.",
      "Hướng dẫn nghiệp vụ kho xe & lái xe tại các Showroom trực thuộc."
    ]
  },
  {
    "id": "pos-58",
    "order": 58,
    "slide": 42,
    "deptCode": "TDBH",
    "deptName": "Hỗ trợ Tín dụng, Bảo hiểm",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "TP/TN Hỗ trợ Tín dụng, Bảo hiểm",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm nhiệm tổ chức triển khai thực hiện và quản trị hoạt động hỗ trợ tín dụng, bảo hiểm tại Công ty/ Showroom theo định hướng từ THACO AUTO.",
      "Đầu mối làm việc với các Tổ chức tín dụng, Công ty Bảo hiểm để xây dựng và phát triển hợp tác với các đối tác tại địa phương.",
      "Đàm phán, ký kết hợp đồng/thỏa thuận hợp tác đảm bảo tính pháp lý và tuân thủ quy định.",
      "Triển khai thực hiện các chính sách, chương trình hợp tác tín dụng, bảo hiểm theo định hướng từ THACO AUTO và/hoặc từ Công ty.",
      "Tổ chức thực hiện và quản trị hiệu quả hoạt động hỗ trợ tín dụng, bảo hiểm tại Công ty/Showroom.",
      "Ban hành quy định/quy trình quản trị hoạt động nội bộ căn cứ theo quy định khung; biên soạn tài liệu hướng dẫn thực hiện.",
      "Giám sát, theo dõi tỷ lệ tín dụng, tỷ lệ thâm nhập bảo hiểm theo chỉ tiêu được giao; kiểm soát chất lượng hồ sơ, tiến độ giải ngân…",
      "Theo dõi các rủi ro phát sinh (room tín dụng, hồ sơ từ chối vay,…).",
      "Tuân thủ thực hiện quy định, quy trình về tín dụng, bảo hiểm; tham gia xử lý các vướng mắc, bất cập tại Công ty/Showroom.",
      "Quản trị hệ thống thông tin, dữ liệu hoạt động tín dụng, bảo hiểm trên PM DDMS.",
      "Đề xuất các giải pháp cải thiện hiệu quả hoạt động tại đơn vị.",
      "Phối hợp với các đối tác tổ chức đào tạo nâng cao kiến thức, nghiệp vụ, kỹ năng tư vấn cho nhân sự tại các Showroom.",
      "Cập nhật các chính sách liên quan đến tín dụng, bảo hiểm.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-59",
    "order": 59,
    "slide": 42,
    "deptCode": "TDBH",
    "deptName": "Hỗ trợ Tín dụng, Bảo hiểm",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Hỗ trợ Tín Dụng",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai, thực hiện nghiệp vụ tín dụng đảm bảo tuân thủ quy định.",
      "Theo dõi, cập nhật thay đổi quy định về chính sách ngân hàng (lãi suất cho vay mua xe, tỷ lệ cho vay, giải ngân ...) theo các tổ chức tín dụng.",
      "Phối hợp với TVBH giải quyết các hồ sơ vay mua xe khi có phát sinh, xử lý các hồ sơ vướng mắc tại Showroom.",
      "Tổng hợp thông tin hoạt động tín dụng, hỗ trợ giải quyết hoặc đề xuất phương án giải quyết các phát sinh trong hoạt động tín dụng.",
      "Tổng hợp phân tích, đánh giá hiệu quả hợp tác tín dụng định kỳ.",
      "Theo dõi room tín dụng và cảnh báo kịp thời cho Phụ trách bộ phận.",
      "Kiểm soát nhập liệu trên DDMS, phân tích, đánh giá hiệu quả hợp tác tín dụng.",
      "Phối hợp với các đối tác tổ chức đào tạo các chuyên đề, sản phẩm tín dụng cho nhân sự tại Showroom.",
      "Cập nhật các chính sách liên quan đến tín dụng.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-60",
    "order": 60,
    "slide": 42,
    "deptCode": "TDBH",
    "deptName": "Hỗ trợ Tín dụng, Bảo hiểm",
    "category": "Nghiệp vụ Chuyên ngành",
    "title": "CV Bảo hiểm",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai thực hiện hoạt động Đại lý bảo hiểm theo định hướng, gia tăng tỷ lệ khai thác bảo hiểm bán mới/tái tục tại hệ thống Showroom trực thuộc.",
      "Theo dõi, cập nhật kịp thời chính sách, chương trình ưu đãi phí bảo hiểm của các Công ty Bảo hiểm có liên kết và các chính sách khác (tỷ lệ phí bảo hiểm, điều khoản bảo hiểm mở rộng, chính sách bồi thường,…) để phục vụ công tác bán hàng.",
      "Phối hợp với TVBH/TVDV thực hiện nghiệp vụ và giải quyết các vướng mắc cho khách hàng.",
      "Tổng hợp thông tin hoạt động bảo hiểm, hỗ trợ giải quyết hoặc đề xuất phương án giải quyết các phát sinh trong hoạt động bảo hiểm,.",
      "Kiểm soát nhập liệu trên DDMS.",
      "Phân tích, đánh giá hiệu quả hợp tác bảo hiểm (khai thác và xử lý bồi thường).",
      "Phối hợp với đối tác bảo hiểm tổ chức đào tạo, thi cấp chứng chỉ bảo hiểm cho nhân sự phụ trách bảo hiểm; Đào tạo nghiệp vụ bảo hiểm cho các nhân sự có liên quan tại Showroom.",
      "Cập nhật các chính sách liên quan đến bảo hiểm.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-61",
    "order": 61,
    "slide": 43,
    "deptCode": "NVKH",
    "deptName": "Kế hoạch Tổng hợp",
    "category": "Nghiệp vụ Cơ bản",
    "title": "TP Kế hoạch tổng hợp",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tham mưu, lập kế hoạch, phân tích dữ liệu và kiểm soát việc thực thi mục tiêu kinh doanh tại Công ty, Showroom, Đại lý. Đầu mối trực tiếp triển khai đồng bộ hệ thống quản trị, hệ thống QĐ-QT và vận hành các ứng dụng phần mềm từ THACO AUTO; nhằm đảm bảo bộ máy Công ty hoạt động chuẩn mực, tuân thủ và đạt hiệu suất tối ưu.",
      "Thu thập, phân tích thông tin thị trường, chính sách, năng lực cạnh tranh để tham mưu cho BLĐ Công ty thiết lập và triển khai, thực hiện kế hoạch kinh doanh (tháng/quý/năm) cho các phòng, bộ phận, đơn vị. Thực hiện báo cáo quản trị định kỳ.",
      "Làm đầu mối tiếp nhận, triển khai áp dụng đồng bộ mô hình hoạt động, hệ thống cấu trúc tổ chức. Phối hợp phân bổ, rà soát và chuẩn hóa rõ ràng chức năng, nhiệm vụ cho từng vị trí nhân sự tại Đơn vị. Tổ chức hướng dẫn, áp dụng và kiểm soát tính tuân thủ hệ thống Quy định, Quy trình xuyên suốt các bộ phận tại Đơn vị.",
      "Đầu mối tổ chức triển khai, duy trì, kiểm soát vận hành các ứng dụng, phần mềm; Tổng hợp các vướng mắc, góp ý từ thực tiễn sử dụng của người dùng để tham mưu, đề xuất các phương án cải tiến, nâng cấp ứng dụng cho phù hợp và hiệu quả hơn.",
      "Đầu mối triển khai các thủ tục pháp lý doanh nghiệp và quản trị thông tin pháp lý tại Đơn vị: hồ sơ đăng ký, hủy bỏ, sáp nhập pháp nhân.",
      "Theo dõi, đánh giá kết quả thực hiện kế hoạch của Đơn vị, các bộ phận.",
      "Phối hợp chặt chẽ với các bộ phận để đảm bảo sự thống nhất trong thực thi kế hoạch. Giám sát tính kỷ luật trong việc nhập liệu lên hệ thống, đảm bảo nguồn dữ liệu luôn chính xác và đầy đủ.",
      "Thiết lập cơ chế kiểm soát tuân thủ vận hành hệ thống cấu trúc và CNNV, hệ thống quy định, quy trình quản trị tại Đơn vị.",
      "Đào tạo nâng cao năng lực phân tích số liệu, kỹ năng lập kế hoạch, khả năng xây dựng hệ thống quản trị và hệ thống QĐ-QT cho các phòng, bộ phận."
    ]
  },
  {
    "id": "pos-62",
    "order": 62,
    "slide": 44,
    "deptCode": "TCKT",
    "deptName": "Kế toán – Tài chính",
    "category": "Nghiệp vụ Cơ bản",
    "title": "TP Kế toán – Tài chính",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm toàn diện về công tác Kế toán – Tài chính tại đơn vị. Chịu trách nhiệm trước Ban lãnh đạo về tính trung thực BCTC; Tuân thủ thuế địa phương; An toàn dòng tiền & Kiểm soát công nợ và tồn kho.",
      "Tổ chức hạch toán kế toán đầy đủ theo chuẩn mực và quy định Tập đoàn.",
      "Kiểm soát: Doanh thu bán xe, dịch vụ, phụ tùng; Chi phí hoạt động, chi phí sửa chữa, bảo hành; Giá vốn hàng bán.",
      "Lập và ký duyệt: Báo cáo tài chính tháng/quý/năm; Báo cáo thuế GTGT, TNDN, TNCN;",
      "Kiểm soát hợp đồng kinh tế, hồ sơ pháp lý. Quản lý tài sản, đầu tư, XDCB tại đơn vị.",
      "Quản lý ngân sách chi phí năm và kiểm soát thực hiện.",
      "Phân tích: Doanh thu, chi phí, lợi nhuận theo từng mảng (KD xe, KD DVPT theo từng thương hiệu; Tín dụng, bảo hiểm…); Tỷ lệ doanh thu HH/Doanh thu bán hàng; Tỷ lệ chi phí giảm giá/Doanh thu bán hàng; Tỷ lệ doanh thu HH còn lại/Doanh thu thuần.",
      "Kiểm soát dòng tiền tuần/tháng.",
      "Cảnh báo: Công nợ rủi ro; Tồn kho chậm luân chuyển.",
      "Phối hợp xây dựng kế hoạch tài chính.",
      "Đào tạo đội ngũ kế toán về: Chính sách thuế mới; Quy trình hạch toán chuẩn.",
      "Huấn luyện nhận diện rủi ro tài chính. Xây dựng đội ngũ kế thừa."
    ]
  },
  {
    "id": "pos-63",
    "order": 63,
    "slide": 44,
    "deptCode": "TCKT",
    "deptName": "Kế toán – Tài chính",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV Thanh toán & Công nợ",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm kiểm soát toàn bộ hoạt động Thu – Chi; công nợ phải thu – phải trả. Kiểm soát thanh toán, kiểm soát nhập – xuất – tồn hàng hóa đảm bảo đúng quy định, quy trình.",
      "Theo dõi công nợ khách hàng: Bán xe, Dịch vụ, Bảo hiểm. Theo dõi công nợ NCC. Kiểm tra hồ sơ thanh toán: Hóa đơn, Hợp đồng, Biên bản nghiệm thu.",
      "Lập kế hoạch dòng tiền tuần.",
      "Quản lý toàn bộ tài sản, công cụ dụng cụ tại đơn vị (Ghi nhận tăng/giảm TSCĐ. Theo dõi khấu hao; Quản lý hồ sơ; kiểm kê; theo dõi đầu tư sửa chữa)",
      "Hạch toán nhập – xuất – tồn. Đối chiếu kho – kế toán. Tính giá vốn hàng bán. Theo dõi tồn kho chậm luân chuyển. Trích lập dự phòng giảm giá tồn kho.",
      "Cảnh báo công nợ rủi ro. Phối hợp kinh doanh thu hồi nợ. Đối chiếu công nợ khách hàng, ngân hàng hàng ngày.",
      "Phối hợp Đề xuất thanh lý tài sản; Kiểm soát cấp phát CCDC.",
      "Cảnh báo tồn kho vượt mức. Đề xuất xử lý hàng tồn chậm. Kiểm soát quy trình xuất kho.",
      "Hướng dẫn bộ phận hỗ trợ bán hàng xe và bán hàng DVPT về quy định công nợ. Đào tạo quy trình thanh toán chuẩn.",
      "Tự đào tạo, nâng cấp các kỹ năng, nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-64",
    "order": 64,
    "slide": 44,
    "deptCode": "TCKT",
    "deptName": "Kế toán – Tài chính",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV BCTC & BC Thuế",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thực hiện và đảm bảo tính chính xác của số liệu Báo cáo Tài chính và thực hiện các nghiệp vụ Báo cáo thuế theo đúng quy định của Pháp luật và của Công ty.",
      "Lập báo cáo tài chính theo tháng/quý/năm.",
      "Lập và nộp: Thuế GTGT; Thuế TNDN; Thuế TNCN; Báo cáo hóa đơn.",
      "Theo dõi: Quyết toán thuế cuối năm.",
      "Soát xét: Doanh thu; Giá vốn; Chi phí hợp lệ.",
      "Kiểm soát khóa sổ đúng hạn. Đối chiếu công nợ tổng hợp.",
      "Phối hợp kiểm toán nội bộ. Cảnh báo rủi ro thuế.",
      "Cập nhật văn bản thuế mới. Hướng dẫn hỗ trợ bán hàng xe và bán hàng DVPT hạch toán đúng chuẩn.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-65",
    "order": 65,
    "slide": 45,
    "deptCode": "HCNS",
    "deptName": "Nghiệp vụ Nhân sự",
    "category": "Nghiệp vụ Cơ bản",
    "title": "TP Nghiệp vụ Nhân sự",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm thực hiện và quản trị nghiệp vụ ĐGNS & Tuyển dụng, Đào tạo các thành phần: (C) Nhân sự Quản lý, Chuyên viên và Kỹ thuật viên tay nghề cao; (D) Kỹ thuật viên và nhân sự thừa hành tại Đơn vị.",
      "Thực hiện, kiểm soát nghiệp vụ nhân sự (Tuyển dụng, Đào tạo, QLNS) tuân thủ QĐ-QT nghiệp vụ và phân cấp quản trị.",
      "Triển khai các chương trình ĐGNS định kỳ và thường xuyên theo thành phần nhân sự.",
      "Tham mưu, báo cáo các bất cập/rủi ro và đề xuất giải pháp quản trị cho Ban lãnh đạo Công ty về công tác nhân sự.",
      "Quản trị định biên nhân sự, thực hiện phân tích năng suất lao động và chi phí nhân sự đáp ứng yêu cầu hoạt động kinh doanh.",
      "Quản trị thực hiện chính sách nhân sự theo thành phần và đề xuất hiệu chỉnh phù hợp mặt bằng xã hội tại địa phương.",
      "Lập kế hoạch nhân sự theo tháng/quý/năm, triển khai và quản trị việc thực hiện tại Đơn vị.",
      "Phối hợp với VPĐH, triển khai và tham gia các chương trình đào tạo chuyên môn, nghiệp vụ, nhân sự do VPĐH tổ chức.",
      "Hướng dẫn, đào tạo trực tiếp nhân sự thuộc phạm vi quản lý và đào tạo hội nhập cho các nhân sự mới."
    ]
  },
  {
    "id": "pos-66",
    "order": 66,
    "slide": 45,
    "deptCode": "HCNS",
    "deptName": "Nghiệp vụ Nhân sự",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV ĐGNS & Tuyển dụng",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thực hiện theo dõi định biên nhân sự, thực hiện các nghiệp vụ về tuyển dụng nhân sự phục vụ nhu cầu của Công ty, Showroom. Phân tích năng suất, hiệu quả công việc của nhân sự.",
      "Tham gia thực hiện chương trình ĐGNS định kỳ và thường xuyên theo thành phần nhân sự.",
      "Quản trị kế hoạch tuyển dụng; TC-TC nhân sự (theo Khung TC-TC Nhân sự THACO AUTO), TC-TC Tuyển dụng. Thực hiện nghiệp vụ tuyển dụng theo kế hoạch.",
      "Quản trị định biên nhân sự, kế hoạch tuyển dụng và chi phí nhân sự theo thành phần nhân sự.",
      "Phân tích, đánh giá năng suất lao động; đánh giá hiệu quả vận hành và đề xuất cải tiến.",
      "Tham gia hướng dẫn, đào tạo hội nhập cho các nhân sự mới.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-67",
    "order": 67,
    "slide": 45,
    "deptCode": "HCNS",
    "deptName": "Nghiệp vụ Nhân sự",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV QLNS & Tiền lương",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thực hiện các nghiệp vụ quản lý dữ liệu nhân sự, tiền lương và các chế độ, chính sách cho nhân sự theo quy định của Pháp luật và Công ty.",
      "Thực hiện nghiệp vụ đào tạo (lập kế hoạch đào tạo, tổ chức đào tạo, đánh giá hiệu quả sau đào tạo; quản trị dữ liệu đào tạo, …).",
      "Kiểm soát thực hiện nghiệp vụ QLLĐ (ký kết HĐLĐ; điều chuyển, bổ nhiệm; kỷ luật; chấm dứt HĐLĐ,…).",
      "Kiểm soát thực hiện nghiệp vụ tiền lương (chấm công, tính lương, BHXH, Thuế TNCN,…), thưởng năng suất.",
      "Quản lý dữ liệu nhân sự (HRM) và hồ sơ nhân sự.",
      "Quản trị các chính sách cho nhân sự theo đúng quy định của Pháp luật và Công ty.",
      "Tham gia thực hiện các chương trình đào tạo chuyên môn, nghiệp vụ do VPĐH, Công ty tổ chức cho các thành phần nhân sự.",
      "Cập nhật các văn bản pháp luật, chính sách liên quan đến nhân sự.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-68",
    "order": 68,
    "slide": 46,
    "deptCode": "MKT",
    "deptName": "Marketing",
    "category": "Nghiệp vụ Cơ bản",
    "title": "TP Marketing",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm tổ chức, điều hành và kiểm soát toàn bộ hoạt động Marketing, CSKH đảm bảo tính đồng bộ, hiệu quả chi phí và định hướng ban hành từ VPĐH; tuân thủ quy định, tối ưu hiệu quả kinh doanh tại Đơn vị.",
      "Lập kế hoạch và tổ chức triển khai, kiểm soát chi phí, đánh giá hiệu quả hoạt động Marketing kinh doanh của Đơn vị tại thị trường; Kiểm soát công tác triển khai hoạt động CSKH tại Đơn vị.",
      "Triển khai Marketing trực tuyến & phương thức Marketing mới (Livestream, Video review xe…) theo phân cấp.",
      "Quản lý vận hành các hạng mục kỹ thuật số (website, app, MXH); Triển khai công tác quản lý, chăm sóc nhận diện, tư liệu Marketing.",
      "Quản trị cơ sở dữ liệu khách hàng của Đơn vị, của THACO AUTO & triển khai các chương trình CSKH “Tận tâm phục vụ”; Kiểm soát CSVC, tác phong, hoạt động chăm sóc khách hàng.",
      "Quản trị kế hoạch Marketing kinh doanh & kiểm soát, đánh giá hiệu quả chi phí Marketing tại Đơn vị.",
      "Tổ chức công tác tuyển dụng, kiện toàn và phát triển đội ngũ nhân sự Marketing.",
      "Kiểm soát việc thực hiện các hoạt động Kỹ thuật Marketing và CSKH theo quy định, quy trình và phân cấp quản lý.",
      "Tổ chức đào tạo xu hướng Marketing mới phục vụ kinh doanh và tinh thần “Tận tâm phục vụ” và các tình huống ứng dụng trong thực tiễn."
    ]
  },
  {
    "id": "pos-69",
    "order": 69,
    "slide": 46,
    "deptCode": "MKT",
    "deptName": "Marketing",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV Kế hoạch Marketing",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai ứng dụng các giải pháp Marketing, nền tảng Digital và công tác sản xuất kỹ thuật theo đúng định hướng ban hành từ VPĐH và yêu cầu thực tiễn tại thị trường quản lý.",
      "Quản lý vận hành các giải pháp, ứng dụng Digital, hệ thống kênh trực tuyến của Công ty và giám sát các Showroom, Đại lý độc lập.",
      "Triển khai các giải pháp Marketing bán hàng mới theo xu hướng; Phân tích, đề xuất giải pháp gia tăng hiệu quả Marketing trực tuyến.",
      "Hướng dẫn, tư vấn và hỗ trợ kỹ thuật quản trị kênh, công cụ, phương pháp triển khai kênh trực tuyến của cá nhân NSBH, TVDV.",
      "Kiểm soát triển khai kế hoạch đặt hàng sản xuất và tiến độ thi công nhận diện, giao nhận AVP, quà tặng tại Đơn vị.",
      "Quản trị nội dung & kiểm soát vận hành hệ thống kênh trực tuyến của Đơn vị và các giải pháp, công cụ Marketing tại hệ thống Showroom.",
      "Quản trị danh mục & kiểm soát hiệu quả sử dụng AVP, quà tặng tại hệ thống Showroom.",
      "Tham gia đào tạo xu hướng Marketing mới phục vụ kinh doanh."
    ]
  },
  {
    "id": "pos-70",
    "order": 70,
    "slide": 46,
    "deptCode": "MKT",
    "deptName": "Marketing",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV CSKH",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm về quản lý dữ liệu khách hàng tại Công ty, hệ thống Showroom & Đại lý độc lập; Triển khai, kiểm soát hoạt động CSKH tại Đơn vị, đảm bảo tuân thủ quy trình và nâng cao chất lượng phục vụ khách hàng tại thị trường quản lý theo tinh thần “Tận tâm phục vụ”.",
      "Quản lý cơ sở dữ liệu thông tin khách hàng tại Đơn vị (khách hàng quan trọng, thân thiết, khách hàng tiềm năng mua xe/sử dụng dịch vụ) và khách hàng của THACO AUTO.",
      "Xây dựng các chương trình CSKH; Kiểm soát CSVC, tác phong, hoạt động chăm sóc khách hàng.",
      "Kiểm soát công tác CSKH (tình trạng phản hồi yêu cầu liên hệ của khách trên cách kênh, khảo sát sự hài lòng khách hàng, chương trình CSKH).",
      "Hướng dẫn, giám sát tuân thủ Quy định - Quy trình CSKH tại Đơn vị.",
      "Theo dõi việc cập nhật, khai thác và sử dụng dữ liệu khách hàng đúng quy định.",
      "Tổng hợp, báo cáo định kỳ Ban lãnh đạo Công ty về dữ liệu khách hàng và chương trình CSKH tại thị trường quản lý.",
      "Tham gia đào tạo về tinh thần “Tận tâm phục vụ” và các tình huống ứng dụng trong thực tiễn."
    ]
  },
  {
    "id": "pos-71",
    "order": 71,
    "slide": 47,
    "deptCode": "QTVP",
    "deptName": "Quản trị Văn phòng & An sinh đời sống",
    "category": "Nghiệp vụ Cơ bản",
    "title": "TP Quản trị Văn phòng & An sinh đời sống",
    "tier": 2,
    "duties": [
      "Chịu trách nhiệm ban hành, triển khai, kiểm soát quy định, quy trình, tiêu chuẩn định mức trong công tác QTVP & ASĐS tại VP Công ty và các Showroom.",
      "Ban hành, triển khai thực hiện và kiểm soát các quy định, quy trình, tài liệu về nghiệp vụ: AN-BV, PCCN, ATLĐ; PCTT và DVHC; quản lý các rủi ro liên quan",
      "Kiểm soát các tiêu chuẩn, chất lượng dịch vụ hỗ trợ kinh doanh tại các Showroom (Bảo vệ, đón tiếp khách hàng; phục vụ hậu cần); đề xuất cải tiến quy trình phục vụ nhằm nâng cao trải nghiệm khách hàng.",
      "Triển khai các công việc trong hoạt động hỗ trợ văn phòng (quản lý trang thiết bị văn phòng, văn thư lưu trữ, hỗ trợ công tác,...), đáp ứng các quy định khung từ THACO AUTO, phục vụ kịp thời hoạt động VP Công ty, quản lý các tiêu chuẩn, định mức tại các Showroom.",
      "Tham mưu Ban Lãnh đạo Đơn vị xử lý các công việc theo chuyên môn; cập nhật và triển khai các quy định của pháp luật liên quan",
      "Lập kế hoạch và kiểm soát ngân sách QTVP & ASĐS, dịch vụ hỗ trợ kinh doanh tại đơn vị, quản lý sử dụng hiệu quả các nguồn lực, chi phí phát sinh.",
      "Phối hợp Giám đốc Showroom đánh giá, bố trí nhân sự Bảo vệ đón tiếp khách hàng; phục vụ hậu cần tại các Showroom đáp ứng yêu cầu thực tế và các tiêu chí, tiêu chuẩn.",
      "Tổ chức huấn luyện, đào tạo nghiệp vụ, kỹ năng và tâm thế tận tâm phục vụ đến khách hàng cho đội ngũ nhân sự tại các Showroom."
    ]
  },
  {
    "id": "pos-72",
    "order": 72,
    "slide": 47,
    "deptCode": "QTVP",
    "deptName": "Quản trị Văn phòng & An sinh đời sống",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV Quản lý Bảo vệ, Đón tiếp Khách hàng",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm quản lý nghiệp vụ AN-BV, đón tiếp khách hàng, PCCN, ATLĐ, PCTT tại Công ty và đơn vị trực thuộc.",
      "Phối hợp xây dựng, tổ chức thực hiện các phương án về AN-BV, PCCN, ATLĐ, PCTT tại các Showroom, phù hợp thực tế, kiểm soát việc thực hiện.",
      "Hướng dẫn và kiểm soát thực hiện các tiêu chuẩn đón tiếp, phục vụ khách hàng; Kiểm tra định kỳ, đột xuất, đánh giá thực hiện nghiệp vụ AN-BV, PCCN, ATLĐ, PCTT & ĐTKH tại các Showroom.",
      "Hướng dẫn, hỗ trợ và kiểm soát các Showroom tuân thủ quy định, quy trình; ghi nhận các nội dung chưa hợp lý và đề xuất điều chỉnh; nhận diện, báo cáo rủi ro trong chuyên môn và đề xuất biện pháp xử lý.",
      "Tham gia đánh giá, bố trí nhân sự Bảo vệ, đón tiếp khách hàng theo tiêu chí, tiêu chuẩn;",
      "Đánh giá, đề xuất nhà cung cấp dịch vụ bảo vệ; kiểm soát chất lượng thực hiện",
      "Triển khai và kiểm soát thực hiện công tác quản lý, bảo trì các trang thiết bị văn phòng, điều phối sử dụng hiệu quả giữa các đơn vị trực thuộc.",
      "Đề xuất ứng dụng phần mềm, công nghệ thông tin phục vụ công tác quản lý;",
      "Tham gia tổ chức đào tạo, huấn luyện nghiệp vụ AN-BV, PCCN, ATLĐ, PCTT; hướng dẫn, hỗ trợ cho các Showroom thực hiện công việc tuân thủ quy định"
    ]
  },
  {
    "id": "pos-73",
    "order": 73,
    "slide": 47,
    "deptCode": "QTVP",
    "deptName": "Quản trị Văn phòng & An sinh đời sống",
    "category": "Nghiệp vụ Cơ bản",
    "title": "CV Quản lý Dịch vụ hậu cần",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm quản lý dịch vụ hậu cần (phục vụ khách hàng; vệ sinh, 5S, dịch vụ hỗ trợ VP) tại các Showroom trực thuộc.",
      "Hướng dẫn, hỗ trợ và kiểm soát việc thực hiện quy định, quy trình, tiêu chuẩn trong công tác phục vụ hậu cần (phục vụ khách hàng; vệ sinh, 5S) tại các Đơn vị;",
      "Quản lý định mức cấp phát, sử dụng vật tư, hóa phẩm, công cụ dụng cụ,… trong công tác DVHC tại các Showroom, đảm bảo sử dụng hiệu quả.",
      "Đề xuất cải tiến quy trình, tiêu chuẩn vệ sinh, 5S pha chế, nâng cao hiệu quả sử dụng nguyên vật liệu, hóa chất.",
      "Thực hiện và kiểm soát các dịch vụ hỗ trợ văn phòng tại VP Công ty và các Showroom",
      "Tham gia đánh giá, bố trí nhân sự phục vụ hậu cần;",
      "Đánh giá, đề xuất các nhà cung cấp dịch vụ, nguyên vật liệu, hóa phẩm, vật tư tiêu hao,… trong công tác DVHC và kiểm soát chất lượng, chi phí thực hiện.",
      "Đề xuất ứng dụng giải pháp công nghệ nhằm nâng cao chất lượng dịch vụ và hiệu suất công việc",
      "Tham gia tổ chức đào tạo, huấn luyện nghiệp vụ và kỹ năng phục vụ khách hàng cho các Đơn vị."
    ]
  },
  {
    "id": "pos-74",
    "order": 74,
    "slide": 48,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "CV Hỗ trợ bán hàng xe",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thực hiện các nghiệp vụ phục vụ bán hàng, kiểm soát nhập liệu, theo dõi chi phí liên quan đến bán hàng xe tại Showroom.",
      "Thực hiện xuất hóa đơn bán hàng, thu tiền và quản lý công nợ phải thu khách hàng.",
      "Theo dõi tiến độ hồ sơ vay/giải ngân, cấp đơn bảo hiểm và đối soát thanh toán công nợ với đối tác đúng quy định.",
      "Soát xét giá bán, chương trình bán hàng khi ký hợp đồng bán xe.",
      "Tham gia lập & theo dõi thực hiện chi phí KD xe, chi phí vận hành.",
      "Theo dõi thực tế định mức chi phí bán hàng (giảm giá, hoa hồng, Marketing, vận chuyển). Tính chi phí/xe bán ra.",
      "Kiểm soát tuân thủ nhập liệu chi phí xe trên Hệ thống máy.",
      "Đối chiếu số liệu, hóa đơn, chứng từ với BP kế toán trên hệ thống máy.",
      "Thực hiện nghiệp vụ tín dụng, bảo hiểm theo quy định Công ty. Theo dõi, cập nhật kịp thời chính sách tín dụng, chính sách phí bảo hiểm của các đối tác tín dụng, bảo hiểm để phục vụ công tác bán hàng tại Showroom.",
      "Phối hợp TVBH giới thiệu sản phẩm tín dụng, bảo hiểm đến khách hàng.",
      "Đầu mối làm việc và đối soát với đối tác Tín dụng, Bảo hiểm tại địa phương.",
      "Báo cáo chi phí ngày/tuần/tháng.",
      "Tham gia đầy đủ các khóa đào tạo chuyên môn do nội bộ tổ chức.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-75",
    "order": 75,
    "slide": 48,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "CV Hỗ trợ bán hàng DVPT",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm thực hiện các nghiệp vụ phục vụ bán hàng, kiểm soát nhập liệu, theo dõi chi phí liên quan đến bán hàng DVPT tại Showroom.",
      "Thực hiện xuất hóa đơn bán hàng, thu tiền và quản lý công nợ phải thu khách hàng.",
      "Theo dõi, cập nhật kịp thời chính sách phí bảo hiểm của các đối tác bảo hiểm để phục vụ công tác tái tục bảo hiểm tại Showroom.",
      "Phối hợp với TVDV thực hiện tư vấn, giới thiệu sản phẩm bảo hiểm tái tục đến khách hàng. Theo dõi cấp đơn và thu công nợ bảo hiểm tái tục.",
      "Soát xét giá bán và chương trình dịch vụ.",
      "Tham gia lập & theo dõi thực hiện chi phí KD xe, chi phí vận hành.",
      "Theo dõi thực tế định mức chi phí dịch vụ (phụ tùng, vật tư, nhân công). Quản lý chi phí điện – nước – nhân sự – vận hành. Tính chi phí/RO dịch vụ.",
      "Kiểm soát tuân thủ nhập liệu chi phí DVPT trên Hệ thống máy",
      "Đối chiếu số liệu, hóa đơn, chứng từ với BP kế toán trên hệ thống máy.",
      "Thực hiện nhập liệu thông tin bảo hiểm tái tục lên PM DDMS; phân tích, đánh giá hiệu quả hợp tác bảo hiểm tại Showroom (khai thác và xử lý bồi thường).",
      "Báo cáo chi phí ngày/tuần/tháng.",
      "Tham gia đầy đủ các khóa đào tạo chuyên môn do nội bộ tổ chức.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-76",
    "order": 76,
    "slide": 49,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "CV Marketing Bán hàng",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm triển khai các hoạt động Marketing bán hàng, kiểm soát tư liệu Marketing, quà tặng; chăm sóc nhận diện thương hiệu; kiểm soát vận hành kênh, công cụ Digital; Phối hợp triển khai các chương CSKH và kiểm soát cập nhật dữ liệu khách hàng tại Showroom.",
      "Tham gia phối hợp triển khai thực hiện các kế hoạch Marketing bán hàng, tư liệu theo thương hiệu, nhóm TH, sản phẩm tại Showroom.",
      "Hướng dẫn, kiểm soát hoạt động Marketing bán hàng của Nhân sự bán hàng/Dịch vụ.",
      "Chăm sóc nhận diện thương hiệu & quản lý vận hành kênh, công cụ Digital, hiệu quả sử dụng AVP, quà tặng Marketing tại Showroom.",
      "Kiểm soát công tác cập nhật thông tin khách hàng, tiến trình tư vấn, chăm sóc khách hàng mua xe/ sử dụng dịch vụ của nhân sự bán hàng/dịch vụ tại Showroom.",
      "Triển khai công tác CSKH tại Showroom theo định hướng từ Văn phòng Công ty; theo dõi tiến độ xử lý khiếu nại phàn nàn.",
      "Quản lý công tác triển khai và chi phí Marketing kinh doanh tại Showroom theo kế hoạch.",
      "Quản trị danh mục & kiểm soát hiệu quả sử dụng AVP, quà tặng tại hệ thống Showroom.",
      "Theo dõi việc cập nhật, khai thác và sử dụng dữ liệu khách hàng tại Showroom đúng quy định.",
      "Tham gia hỗ trợ công tác đào tạo xu hướng Marketing mới phục vụ kinh doanh cho nhân sự bán hàng/dịch vụ tại Showroom theo kế hoạch.",
      "Tự đào tạo, nâng cấp các kỹ năng nghiệp vụ chuyên môn phục vụ công việc."
    ]
  },
  {
    "id": "pos-77",
    "order": 77,
    "slide": 49,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "NV Kho xe & Lái xe",
    "tier": 4,
    "duties": [
      "Chịu trách nhiệm tuân thủ thực hiện hoạt động quản lý kho xe, quản lý chất lượng theo quy định, quy trình và thực hiện nhiệm vụ lái xe khi có sự điều động từ Ban lãnh đạo Công ty/Showroom.",
      "Giao nhận, sắp xếp, lưu trữ, bảo quản, bảo dưỡng xe mới (lưu kho, trưng bày); xe công, xe lái thử (Demo), xe thay thế; xe Mobile Service/sửa chữa lưu động, xe chuyên dụng.",
      "Quản lý giấy tờ xe (xe công, xe lái thử, xe Mobile Service/sửa chữa lưu động; xe chuyên dụng).",
      "Kiểm soát, theo dõi tình hình chất lượng xe lưu kho tại Showroom và quản lý, sử dụng vật tư theo định mức.",
      "Tuân thủ nhập liệu và quản lý tồn kho (xuất – nhập – tồn) trên phần mềm quản trị hệ thống DDMS.",
      "Thực hiện lái xe phục vụ lãnh đạo, CB-NV đi công tác, gặp gỡ đối tác, khách hàng,… hoặc lái xe phục vụ hoạt động kinh doanh theo phân công thực tế tại Đơn vị.",
      "Tuân thủ thực hiện 5S, PCCN, an toàn tài sản tại kho xe.",
      "Kiểm soát, báo cáo tồn kho, sức chứa kho xe; Báo cáo các bất cập chất lượng xe lưu kho, chất lượng xe giao nhận từ GNVC cho Lãnh đạo Công ty/Showroom, Lãnh đạo Khối/Nghiệp vụ tại VPĐH.",
      "Tự đào tạo, nâng cấp kỹ năng nghiệp vụ chuyên môn phục vụ cho công việc."
    ]
  },
  {
    "id": "pos-78",
    "order": 78,
    "slide": 50,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "Tổ trưởng Bảo vệ, đón tiếp Khách hàng",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm tổ chức, bố trí nhân sự thực hiện Phương án AN-BV, PCCN, ATLĐ, PCTT và kiểm soát tại Showroom.",
      "Quản lý công tác AN-BV, PCCN, ATLĐ, PCTT đảm bảo tuân thủ Quy định – Quy trình nội bộ và Pháp luật, đảm bảo an toàn cho người và tài sản tại Showroom, Kho, Điểm xưởng; Đề xuất các phương án phòng ngừa rủi ro, xử lý các tình huống, sự cố trong chuyên môn tại Showroom.",
      "Tham gia xây dựng phương án AN-BV, đánh giá đề xuất, bố trí nhân sự Bảo vệ theo phương án, đáp ứng tiêu chí, tiêu chuẩn và tình hình thực tế tại Showroom; Tham gia trực vị trí tuần tra tăng cường theo phương án AN-BV tại Showroom.",
      "Kiểm soát thái độ, công tác đón tiếp, hướng dẫn khách hàng của nhân sự trực thuộc đảm bảo các tiêu chuẩn về đón tiếp khách hàng.",
      "Quản lý trang thiết bị văn phòng và các trang thiết bị gắn liền với CSVC, vận hành CSVC theo quy định, kiểm tra phát hiện hư hỏng và báo cáo, giám sát nhà thầu DTBT theo hướng dẫn từ NV tại VP Công ty.",
      "Kiểm soát việc chấp hành Nội quy, Quy định đối với CB-NV và nhà thầu bên ngoài; Tổng hợp báo cáo tuần, tháng và đột xuất khi có yêu cầu. Xử lý các tình huống khẩn cấp trong phạm vi Đơn vị.",
      "Đề xuất định biên, bố trí, đánh giá nhân sự Bảo vệ theo tiêu chí, tiêu chuẩn và tình hình thực tế tại Showroom.",
      "Hướng dẫn, huấn luyện cho nhân viên nắm vững chuyên môn nghiệp vụ, kỹ năng đón tiếp khách hàng, tinh thần tận tâm phục vụ."
    ]
  },
  {
    "id": "pos-79",
    "order": 79,
    "slide": 50,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "Nhân viên Bảo vệ",
    "tier": 4,
    "duties": [
      "Thực hiện công tác tuần tra, canh gác, kiểm soát PCCN, ATLĐ, PCTT và xử lý sự cố theo phương án.",
      "Trực cổng chính và các vị trí, tuần tra theo phương án AN-BV tại Showroom; Xử lý các sự cố, tình huống phát sinh.",
      "Đón tiếp, hướng dẫn khách hàng, đối tác đến Showroom với thái độ chuyên nghiệp, tận tâm phục vụ.",
      "Ghi nhận đầy đủ thông tin, báo cáo kịp thời cho nhân sự quản lý trực tiếp các vấn đề phát sinh xảy ra trong ca trực; bàn giao đầy đủ khi kết thúc ca trực.",
      "Tuần tra, kiểm soát đảm bảo ANTT, an toàn PCCN, ATLĐ, PCTT. Nhận thư, bưu phẩm của Đơn vị cập nhật sổ theo dõi tại Showroom, chuyển tiếp đến nhân sự phụ trách/trực tiếp đến người nhận.",
      "Kiểm tra, báo cáo Tổ trưởng các hư hỏng sự cố phát sinh về TTB, CSVC.",
      "Chăm sóc cây xanh, cảnh quan (đối với các Showroom đầu tư cây xanh cảnh quan với quy mô vừa và nhỏ).",
      "Kiểm soát CB-NV, nhà thầu chấp hành nghiêm Quy định, Nội quy Công ty; Kiểm soát tài sản, hàng hóa khi mang ra vào cổng đúng QĐ-QT; nhận định các rủi ro phát sinh theo chuyên môn nghiệp vụ, báo cáo cấp quản lý để xử lý.",
      "Hướng dẫn cho đồng nghiệp nắm vững chuyên môn nghiệp vụ, kỹ năng đón tiếp khách hàng, tinh thần tận tâm phục vụ."
    ]
  },
  {
    "id": "pos-80",
    "order": 80,
    "slide": 51,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "Tổ trưởng PVHC",
    "tier": 3,
    "duties": [
      "Chịu trách nhiệm tổ chức, bố trí nhân sự thực hiện và kiểm soát công tác phục vụ khách hàng; Vệ sinh 5S, dịch vụ hỗ trợ văn phòng tại Showroom.",
      "Quản lý công tác vệ sinh, phục vụ khách chờ tại Showroom; Xây dựng tần suất, lịch trình vệ sinh, 5S phù hợp từng khu vực, đáp ứng các tiêu chuẩn.",
      "Đánh giá đề xuất, bố trí nhân sự thực hiện công tác vệ sinh, phục vụ khách hàng, đáp ứng tiêu chí, tiêu chuẩn và tình hình thực tế tại Showroom.",
      "Bố trí lịch trực và phân công nhiệm vụ cho nhân viên PVHC (vệ sinh, 5S; phục vụ khách hàng) thực hiện hậu cần các chương trình sự kiện hội họp, đào tạo, sự kiện nội bộ tại Đơn vị.",
      "Thực hiện các dịch vụ hỗ trợ văn phòng phục vụ hoạt động kinh doanh .",
      "Tham gia trực tiếp công việc vệ sinh/phục vụ khách chờ theo chuyên môn.",
      "Kiểm soát định mức vật tư/hoá phẩm vệ sinh, nguyên liệu pha chế đảm bảo phục vụ đúng mục đích và hiệu quả.",
      "Kiểm soát chất lượng công việc và thái độ, tác phong của nhân sự PVHC; Kiểm soát công tác vệ sinh, 5S tại các Khu vực theo quy định.",
      "Quản lý nhu yếu phẩm, hóa phẩm, văn phòng phẩm,… phục vụ hoạt động chung tại Showroom; nhập liệu chi phí phục vụ chung tại Showroom.",
      "Đào tạo, hướng dẫn nhân viên PVHC nắm được chuyên môn nghiệp vụ, quy trình vệ sinh và tiêu chuẩn phục vụ khách hàng, tinh thần tận tâm phục vụ."
    ]
  },
  {
    "id": "pos-81",
    "order": 81,
    "slide": 51,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "NV PVHC (PT Phục vụ khách hàng)",
    "tier": 4,
    "duties": [
      "Thực hiện công tác phục vụ khách hàng tại Showroom.",
      "Thực hiện đón tiếp, pha chế và phục vụ khách hàng các loại nước uống, thức ăn nhẹ theo menu; Phục vụ khách hàng trên tinh thần tận tâm phục vụ.",
      "Thực hiện trang trí các bàn tiếp khách, phòng chờ; Công tác vệ sinh, 5S phòng chờ.",
      "Bảo quản trang thiết bị, công cụ dụng cụ phòng chờ đảm bảo luôn trong tình trạng sử dụng tốt.",
      "Phối hợp thực hiện công tác hậu cần cho các chương trình hội họp, đào tạo, sự kiện, tiếp đoàn tham quan tại Showroom.",
      "Tuân thủ định mức nguyên liệu pha chế, quy định về tác phong, đồng phục và quy định An toàn vệ sinh thực phẩm.",
      "Quản lý chi phí nguyên liệu pha chế, tiêu hao hàng ngày; ghi nhận lượt khách sử dụng dịch vụ thông qua các ứng dụng, phần mềm.",
      "Đào tạo, hướng dẫn đồng nghiệp tiêu chuẩn phục vụ khách hàng, tinh thần tận tâm phục vụ."
    ]
  },
  {
    "id": "pos-82",
    "order": 82,
    "slide": 51,
    "deptCode": "HTKD",
    "deptName": "Hỗ trợ Kinh doanh",
    "category": "Hỗ trợ",
    "title": "NV PVHC (PT Vệ sinh, 5S)",
    "tier": 4,
    "duties": [
      "Thực hiện và kiểm soát công tác vệ sinh, 5S tại Showroom.",
      "Thực hiện công tác vệ sinh, 5S, thu gom, phân loại rác thải đúng quy trình tại các khu vực theo lịch trình, quy trình được quy định.",
      "Sử dụng, bảo quản TTB, CCDC vệ sinh đúng mục đích và hiệu quả. Bố trí sắp xếp vật dụng vệ sinh ngăn nắp và đúng nơi quy định.",
      "Thực hiện hậu cần các chương trình hội họp, đào tạo nội bộ.",
      "Sử dụng hóa chất, vật tư tiêu hao đúng định mức, quản lý vật tư/hoá phẩm tiêu hao; tuân thủ các quy định về thái độ, tác phong, đồng phục.",
      "Kiểm soát công tác vệ sinh, 5S tại các khu vực theo layout vận hành.",
      "Hướng dẫn đồng nghiệp nắm được chuyên môn nghiệp vụ, quy trình vệ sinh và tiêu chuẩn phục vụ khách hàng, tinh thần tận tâm phục vụ"
    ]
  }
];
