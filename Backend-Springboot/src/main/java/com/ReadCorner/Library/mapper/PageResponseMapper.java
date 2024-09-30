package com.ReadCorner.Library.mapper;

import com.ReadCorner.Library.dto_response.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PageResponseMapper {

    //convert an EntityResponse to PageResponse as generic
    public <T> PageResponse<T> toPageResponse(List<T> content, Page<?> page) {
        return new PageResponse<>(
                content,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast()
        );
    }
}
