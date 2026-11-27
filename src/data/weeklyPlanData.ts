export type ShowroomId = 'san_bay' | 'le_loi' | 'hung_nguyen' | 'dien_chau';

export interface ShowroomLabel {
  id: ShowroomId;
  name: string;
  shortName: string;
  workshopName: string;
}

export const SHOWROOMS: ShowroomLabel[] = [
  { id: 'san_bay', name: 'Showroom Sân Bay', shortName: 'SR Sân Bay', workshopName: 'Xưởng Sân Bay' },
  { id: 'le_loi', name: 'Showroom Lê Lợi', shortName: 'SR Lê Lợi', workshopName: 'Xưởng Lê Lợi' },
  { id: 'hung_nguyen', name: 'Showroom Hưng Nguyên', shortName: 'SR Hưng Nguyên', workshopName: 'Xưởng Hưng Nguyên' },
  { id: 'dien_chau', name: 'Showroom Diễn Châu', shortName: 'SR Diễn Châu', workshopName: 'Xưởng Diễn Châu' }
];

export interface VehicleRowMetrics {
  thPrevMonth: number; // TH tháng 10
  khd: number; // KHĐ
  xhdCt: number; // XHĐ - CT
  xhdTh: number; // XHĐ - TH
  hdTon: number; // HĐ tồn chưa XHĐ
}

export interface VehicleBrandPlan {
  id: string;
  name: string;
  segment: 'PC' | 'CV'; // PC: Xe Du lịch, CV: Xe Tải & Bus
  byShowroom: Record<ShowroomId, VehicleRowMetrics>;
}

export interface ServiceRowMetrics {
  thPrevMonth: number; // TH tháng 10 (tỷ đ)
  ct: number; // CT (tỷ đ)
  th: number; // TH (tỷ đ)
  dtTon: number; // DT tồn chưa XHĐ (tỷ đ)
}

export interface ServiceRevenuePlan {
  id: string;
  name: string;
  byShowroom: Record<ShowroomId, ServiceRowMetrics>;
}

export interface WeeklyReportData {
  reportTitle: string;
  updatedAt: string;
  vehicles: VehicleBrandPlan[];
  services: ServiceRevenuePlan[];
}

const emptyVeh = (): VehicleRowMetrics => ({ thPrevMonth: 0, khd: 0, xhdCt: 0, xhdTh: 0, hdTon: 0 });
const emptySrv = (): ServiceRowMetrics => ({ thPrevMonth: 0, ct: 0, th: 0, dtTon: 0 });

export const INITIAL_WEEKLY_REPORT: WeeklyReportData = {
  reportTitle: 'Lũy kế thực hiện Tuần — Tháng 11/2026',
  updatedAt: '27/11/2026',
  vehicles: [
    // === XE DU LỊCH (PC) ===
    {
      id: 'kia',
      name: 'KIA',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 59, khd: 45, xhdCt: 61, xhdTh: 10, hdTon: 35 },
        le_loi: { thPrevMonth: 50, khd: 31, xhdCt: 52, xhdTh: 7, hdTon: 24 },
        hung_nguyen: { thPrevMonth: 21, khd: 17, xhdCt: 20, xhdTh: 1, hdTon: 16 },
        dien_chau: { thPrevMonth: 36, khd: 20, xhdCt: 37, xhdTh: 6, hdTon: 14 }
      }
    },
    {
      id: 'mazda',
      name: 'MAZDA',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 44, khd: 31, xhdCt: 50, xhdTh: 9, hdTon: 22 },
        le_loi: { thPrevMonth: 46, khd: 22, xhdCt: 45, xhdTh: 5, hdTon: 17 },
        hung_nguyen: { thPrevMonth: 11, khd: 12, xhdCt: 13, xhdTh: 4, hdTon: 8 },
        dien_chau: { thPrevMonth: 27, khd: 14, xhdCt: 30, xhdTh: 4, hdTon: 10 }
      }
    },
    {
      id: 'peugeot',
      name: 'PEUGEOT',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 1, khd: 3, xhdCt: 4, xhdTh: 0, hdTon: 3 },
        le_loi: emptyVeh(),
        hung_nguyen: emptyVeh(),
        dien_chau: emptyVeh()
      }
    },
    {
      id: 'ram_jeep',
      name: 'RAM, JEEP',
      segment: 'PC',
      byShowroom: {
        san_bay: emptyVeh(),
        le_loi: emptyVeh(),
        hung_nguyen: emptyVeh(),
        dien_chau: emptyVeh()
      }
    },
    {
      id: 'bmw',
      name: 'BMW',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 5, khd: 5, xhdCt: 6, xhdTh: 3, hdTon: 2 },
        le_loi: emptyVeh(),
        hung_nguyen: emptyVeh(),
        dien_chau: emptyVeh()
      }
    },
    {
      id: 'mini',
      name: 'MINI',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 0, khd: 0, xhdCt: 1, xhdTh: 0, hdTon: 0 },
        le_loi: emptyVeh(),
        hung_nguyen: emptyVeh(),
        dien_chau: emptyVeh()
      }
    },
    {
      id: 'qsd',
      name: 'XE DL ĐÃ QSD',
      segment: 'PC',
      byShowroom: {
        san_bay: { thPrevMonth: 0, khd: 0, xhdCt: 3, xhdTh: 0, hdTon: 0 },
        le_loi: { thPrevMonth: 2, khd: 0, xhdCt: 1, xhdTh: 0, hdTon: 0 },
        hung_nguyen: { thPrevMonth: 0, khd: 0, xhdCt: 1, xhdTh: 0, hdTon: 0 },
        dien_chau: { thPrevMonth: 0, khd: 0, xhdCt: 1, xhdTh: 0, hdTon: 0 }
      }
    },

    // === XE TẢI & BUS (CV) ===
    {
      id: 'tai_nhe',
      name: 'Tải nhẹ',
      segment: 'CV',
      byShowroom: {
        san_bay: emptyVeh(),
        le_loi: { thPrevMonth: 8, khd: 2, xhdCt: 11, xhdTh: 1, hdTon: 1 },
        hung_nguyen: { thPrevMonth: 14, khd: 11, xhdCt: 16, xhdTh: 1, hdTon: 10 },
        dien_chau: { thPrevMonth: 9, khd: 11, xhdCt: 9, xhdTh: 5, hdTon: 6 }
      }
    },
    {
      id: 'tai_trung',
      name: 'Tải trung, Ben trung',
      segment: 'CV',
      byShowroom: {
        san_bay: emptyVeh(),
        le_loi: { thPrevMonth: 4, khd: 3, xhdCt: 5, xhdTh: 0, hdTon: 3 },
        hung_nguyen: { thPrevMonth: 11, khd: 6, xhdCt: 12, xhdTh: 1, hdTon: 5 },
        dien_chau: { thPrevMonth: 5, khd: 2, xhdCt: 5, xhdTh: 1, hdTon: 1 }
      }
    },
    {
      id: 'dau_keo',
      name: 'Đầu kéo, SMRM, Tải nặng',
      segment: 'CV',
      byShowroom: {
        san_bay: emptyVeh(),
        le_loi: { thPrevMonth: 0, khd: 1, xhdCt: 0, xhdTh: 0, hdTon: 1 },
        hung_nguyen: { thPrevMonth: 3, khd: 0, xhdCt: 3, xhdTh: 0, hdTon: 0 },
        dien_chau: emptyVeh()
      }
    },
    {
      id: 'bus',
      name: 'Bus & Mini Bus',
      segment: 'CV',
      byShowroom: {
        san_bay: emptyVeh(),
        le_loi: emptyVeh(),
        hung_nguyen: { thPrevMonth: 0, khd: 5, xhdCt: 2, xhdTh: 0, hdTon: 5 },
        dien_chau: emptyVeh()
      }
    }
  ],
  services: [
    {
      id: 'dvpt_dl',
      name: 'DT DVPT xe DL (tỷ đ)',
      byShowroom: {
        san_bay: { thPrevMonth: 4.8, ct: 5.2, th: 2.2, dtTon: 0.9 },
        le_loi: { thPrevMonth: 4.7, ct: 5.1, th: 2.2, dtTon: 0.7 },
        dien_chau: { thPrevMonth: 2.2, ct: 2.4, th: 1.0, dtTon: 0.2 },
        hung_nguyen: { thPrevMonth: 0.5, ct: 0.6, th: 0.3, dtTon: 0.0 }
      }
    },
    {
      id: 'dvpt_tb',
      name: 'DT DVPT xe T,B (tỷ đ)',
      byShowroom: {
        san_bay: emptySrv(),
        le_loi: { thPrevMonth: 0.1, ct: 0.1, th: 0.06, dtTon: 0.01 },
        dien_chau: { thPrevMonth: 0.1, ct: 0.1, th: 0.06, dtTon: 0.0 },
        hung_nguyen: { thPrevMonth: 2.0, ct: 2.2, th: 0.8, dtTon: 0.8 }
      }
    }
  ]
};

export function sumVehicleBrand(brand: VehicleBrandPlan): VehicleRowMetrics {
  return SHOWROOMS.reduce(
    (acc, sr) => {
      const m = brand.byShowroom[sr.id];
      return {
        thPrevMonth: acc.thPrevMonth + m.thPrevMonth,
        khd: acc.khd + m.khd,
        xhdCt: acc.xhdCt + m.xhdCt,
        xhdTh: acc.xhdTh + m.xhdTh,
        hdTon: acc.hdTon + m.hdTon
      };
    },
    emptyVeh()
  );
}

export function sumVehicleSegment(
  vehicles: VehicleBrandPlan[],
  segment: 'PC' | 'CV',
  showroomId?: ShowroomId
): VehicleRowMetrics {
  return vehicles
    .filter((v) => v.segment === segment)
    .reduce((acc, v) => {
      const m = showroomId ? v.byShowroom[showroomId] : sumVehicleBrand(v);
      return {
        thPrevMonth: acc.thPrevMonth + m.thPrevMonth,
        khd: acc.khd + m.khd,
        xhdCt: acc.xhdCt + m.xhdCt,
        xhdTh: acc.xhdTh + m.xhdTh,
        hdTon: acc.hdTon + m.hdTon
      };
    }, emptyVeh());
}

export function sumServicePlan(srv: ServiceRevenuePlan): ServiceRowMetrics {
  return SHOWROOMS.reduce(
    (acc, sr) => {
      const m = srv.byShowroom[sr.id];
      return {
        thPrevMonth: Number((acc.thPrevMonth + m.thPrevMonth).toFixed(2)),
        ct: Number((acc.ct + m.ct).toFixed(2)),
        th: Number((acc.th + m.th).toFixed(2)),
        dtTon: Number((acc.dtTon + m.dtTon).toFixed(2))
      };
    },
    emptySrv()
  );
}

export function calcPct(th: number, ct: number): number {
  if (!ct || ct <= 0) return 0;
  return Math.round((th / ct) * 100);
}
