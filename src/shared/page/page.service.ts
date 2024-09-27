import { Injectable } from '@nestjs/common';

@Injectable()
export class PageService {

    getPagination(pageData, content, controller) {
        return {
            page: {
                number: pageData.number,
                limit: pageData.limit,
                total: pageData.total,
                next: `/api/${controller}?page=${pageData.number + 1}&limit=${pageData.limit}`,
                prev: (pageData.page - 1 > 0) ? `/api/${controller}?page=${ pageData.page - 1 }&limit=${pageData.limit}` : null,
              },
              content
        }
    }
}
