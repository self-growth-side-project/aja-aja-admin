import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export class TimeUtil {
	public static readonly DATE_TIME_FORMATTER = 'YYYY-MM-DD HH:mm:ss';
	public static readonly KST_TIMEZONE = 'Asia/Seoul';

	public static toDayjsBy(value: string | null): dayjs.Dayjs | null {
		if (!value) {
			return null;
		}

		return dayjs.utc(value, this.DATE_TIME_FORMATTER).tz(this.KST_TIMEZONE);
	}

	public static toStringByDayjs(value: dayjs.Dayjs | null): string | null {
		if (!value) {
			return null;
		}

		return value.tz(this.KST_TIMEZONE).format(this.DATE_TIME_FORMATTER);
	}
}
